import Star from "../sprites/star";
import  Player from "../sprites/player";
import Store from "../sprites/store";
import { config } from "../game";
import { proxy,CLICK_STORE,CATCH_STAR,TIME_END,RESTART_PLAY,UPDATE_SCORE,UPDATE_TIME } from "../core/proxy";
import StateMachine from "../states/fsm";
import Playing from "../states/playing";
import EndPlay from "../states/endPlay";
import { BlendModes, Game } from "phaser";

export enum GameState{  //游戏状态
  PLAYING="playing",    //游戏进行
  End="end"             //游戏结束
};

export default class Play extends Phaser.Scene {
 public player;             //玩家
 public stores;             //石头组
 public targetStore;        //鼠标点击的目标石头
 public l;                  //绳子
 public isClimb;            //玩家是否拉向绳子
 public topgrounds;         //地面
 public randomStarNum;      //星星最大的出现数量
 public timeClock;          //时间
 public curStarNum;         //当前星星的数量
 public freshTime;          //每次产生星星的所需时间
 public isEnd;              //游戏是否结束
 public isPlaying;          //游戏是否进行
 private m_fsm:StateMachine;//状态机
 private score;             //得分
 public state:GameState;    //游戏状态 
 private cloud;             //背景的云
 private tips;              //游戏提示操作文字的图片
 private moveSound;         //玩家拉向石头的声音
 private scoreSound;        //玩家触碰星星得分的声音
 public particles;          //粒子特效
  constructor() {
    super("Play");
    this.stores=[];
  }
  preload() {

  }
  create() {
    //创建状态机，进入游戏进行状态
    this.isEnd=false;
    this.isPlaying=true;
    this.m_fsm=new StateMachine('playing',[
      new Playing(this),
      new EndPlay(this),
    ]);
      //添加游戏音效，提示操作文字
      this.moveSound=this.sound.add("audio_move");
      this.scoreSound=this.sound.add("audio_score");
      this.tips=this.add.image(config.width/2,700,"tips");
      //创建玩家，为玩家设置拉力
      this.player=new Player(this,config.width/2,config.height-314,"player");
      this.player.setClimbForce(1.8);
      //初始化当前星星数，生成时间，最大数
      this.curStarNum=0;
      this.freshTime=0;
      this.randomStarNum=1;
      //初始化分数
      this.score=0;
      //为背景添加云朵装饰
      this.cloud=this.add.tileSprite(500,200,config.width,418,"cloud");
      //创建石头
      this.createStores();
      //创建地面
      this.createGrounds();

      //当点击石头时触发事件
      this.input.on("gameobjectup",this.clickStore,this);
      //初始化绳子，通过画线来实现绳子
      this.l=this.add.line(75,0,0,0,140,0,0xeb981b);
      this.l.setLineWidth(10,10);
      this.l.setVisible(false);
      this.isClimb=false;

      this.timeClock=0;
      //创建粒子
      this.particles=this.add.particles("circle");

      proxy.on(CLICK_STORE,this.climb,this);//订阅点击石头事件
      proxy.on(CATCH_STAR,this.destroyStar,this);//订阅接触星星事件
      proxy.on(RESTART_PLAY,this.restartThisScene,this);//订阅重新开始游戏事件

      //启动UI场景
      this.scene.launch("UI");
      this.scene.bringToTop("UI");
    }

  update(time: number, delta: number) {

    if(this.isEnd==true)this.timeEnd();//当游戏结束时触发时间结束事件
    this.m_fsm.step();
    if(this.state==GameState.PLAYING)//当游戏处于游戏进行状态时
    {
      this.timeClock=this.timeClock+delta/1000;//计算时间
      proxy.emit(UPDATE_TIME,Math.round(this.timeClock));//触发更新时间事件
      this.timeControlStarNum();//根据时间修改星星最大出现数
      this.freshStar(delta);//刷新生成星星的函数
      if(this.isClimb==true)//在拉向石头的时候，将线的起始点设为玩家和石头
      {
        this.l.setTo(this.player.x,this.player.y-58,this.targetStore.x,this.targetStore.y+26);
      }
    }
    if(this.timeClock>=60)//游戏时间到了
    {
      this.isEnd=true;
      this.isPlaying=false;
    }
    this.cloud.tilePositionX-=0.5;//给云朵增加水平移动的动态效果
  }
  clickStore(pointer,store){//点击石头事件
    this.tips.setVisible(false);//当第一次点击石头时，将提示操作文字的图片设为不可见
      proxy.emit(CLICK_STORE,store);//触发点击石头事件
  }
  climb(store){
    if(this.state==GameState.PLAYING)
    {
      this.targetStore=store;//确定目标石头为点击的石头
      //根据目标石头为玩家设置拉力方向
      this.player.setClimbDir( this.targetStore.x-this.player.x,this.targetStore.y-this.player.y);
      this.isClimb=true;
      //在拉向石头的时候，线即绳子则可见
      this.l.setVisible(true);
      //播放音效
      this.moveSound.play();
      //为玩家添加拉力的函数
      this.player.drag();
    }
  }
  createStores(){ //创建石头的函数
    this.stores[0]=new Store(this,50,500,"store");
    this.stores[1]=new Store(this,250,200,"store");
    this.stores[2]=new Store(this,450,500,"store");
    this.stores[3]=new Store(this,650,200,"store");
    this.stores[4]=new Store(this,850,500,"store");
    for(let i=0;i<5;i++)
    {
      //使生成的石头能够交互并能与玩家发送碰撞
      this.stores[i].setInteractive();
      this.physics.add.collider(this.player,this.stores[i]);
    }
  }
  touchGround(){//玩家接触地面时，绳子不可见
    this.l.setVisible(false);
  }
  createGrounds(){//创建地面
    this.topgrounds=this.physics.add.staticGroup();//地面为不可动的静态组
    for(let i=0;i<8;i++)
    {
      this.topgrounds.create(i*128,config.height-64,"topground");
    }
    this.physics.add.collider(this.player,this.topgrounds,this.touchGround,null,this);

  }
  createStar()//创建星星
  {
    if(this.curStarNum<this.randomStarNum)//当前星星数小于最大星星数才可生成新星星
    {
      var star=new Star(this,250,400,"star");
      this.physics.add.collider(this.player,star,this.catchStar,null,this.player,star);
      this.curStarNum++;
    }
  }
  freshStar(delta){//根据固定时间生成星星
    this.freshTime=this.freshTime+delta/1000;
    if(Math.floor(this.freshTime)>=2)
    {
      this.createStar();
      this.freshTime=0;
    }
  }
  timeControlStarNum(){//根据特定时间段设置最大星星数
    if(this.timeClock>=5){
      this.randomStarNum=2;
    }
    if(this.timeClock>=10){
      this.randomStarNum=3;
    }
    if(this.timeClock>=15){
      this.randomStarNum=4;
    }
    if(this.timeClock>=20){
      this.randomStarNum=5;
    }
    if(this.timeClock>=25){
      this.randomStarNum=6;
    }
  }
  catchStar(player,star){//触发接触星星事件
    proxy.emit(CATCH_STAR,star);
  }
  destroyStar(star){//销毁星星时的函数
    star.destroy();//销毁星星
    this.curStarNum--;//当前星星数减少1
    this.starDestroyEffect(star);//使用星星销毁时的粒子特效
    this.updateScore();//更新得分
  }
  timeEnd(){//触发游戏结束事件
    proxy.emit(TIME_END,this.score);
  }
  restartThisScene(){//重开游戏的函数
    //当游戏重开时清理事件
    proxy.off(CLICK_STORE,this.climb,this);
    proxy.off(CATCH_STAR,this.destroyStar,this);
    proxy.off(RESTART_PLAY,this.restartThisScene,this);
    //重开游戏场景
    this.scene.restart();
  }
  updateScore(){//更新得分函数
    if(this.state==GameState.PLAYING)
    {
      //播放得分音效
      this.scoreSound.play();
      //加分
      this.score=this.score+10;
      //触发更新得分事件
      proxy.emit(UPDATE_SCORE,this.score);
    }
  }
  starDestroyEffect(star){//生成星星销毁时的粒子特效
    var emitter=this.particles.createEmitter({
      x:star.x,
      y:star.y,
      speed:100,
      scale:{start:1,end:0},
      lifespan:1000,
      quantity:1,
      blendModes:'ADD',
      maxParticles:10,
    });
  }
}


