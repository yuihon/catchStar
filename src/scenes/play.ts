import Star from "../sprites/star";
import  Player from "../sprites/player";
import Store from "../sprites/store";
import { config } from "../game";
import { proxy,CLICK_STORE,CATCH_STAR,TIME_END,RESTART_PLAY,UPDATE_SCORE,UPDATE_TIME } from "../core/proxy";
import StateMachine from "../states/fsm";
import Playing from "../states/playing";
import EndPlay from "../states/endPlay";
import { Game } from "phaser";

export enum GameState{
  PLAYING="playing",
  End="end"
};

export default class Play extends Phaser.Scene {
 public player;
 public stores;
 public targetStore;
 public l;
 public isClimb;
 public topgrounds;
 public randomStarNum;
 public timeClock;
 public curStarNum;
 public freshTime;
 public isEnd;
 public isPlaying;
 private m_fsm:StateMachine;
 private score;
 public state:GameState;
 private cloud;
 private tips;
 private ray;
 private moveSound;
 private scoreSound;
  constructor() {
    super("Play");
    this.stores=[];
  }
  preload() {

  }
  create() {
    this.isEnd=false;
    this.isPlaying=true;
    this.m_fsm=new StateMachine('playing',[
      new Playing(this),
      new EndPlay(this),
    ]);
      this.moveSound=this.sound.add("audio_move");
      this.scoreSound=this.sound.add("audio_score");
      this.tips=this.add.image(config.width/2,700,"tips");
      this.player=new Player(this,config.width/2,config.height-314,"player");
      this.player.setClimbForce(1.8);
      this.curStarNum=0;
      this.freshTime=0;
      this.randomStarNum=1;
      this.score=0;
      this.cloud=this.add.tileSprite(500,200,config.width,418,"cloud");
      this.createStores();
      this.createGrounds();


      this.input.on("gameobjectup",this.clickStore,this);
      this.l=this.add.line(75,0,0,0,140,0,0xeb981b);
      this.l.setLineWidth(10,10);
      this.l.setVisible(false);
      this.isClimb=false;

      this.timeClock=0;



      proxy.on(CLICK_STORE,this.climb,this);
      proxy.on(CATCH_STAR,this.destroyStar,this);
      proxy.on(RESTART_PLAY,this.restartThisScene,this);

      this.scene.launch("UI");
      this.scene.bringToTop("UI");
    }

  update(time: number, delta: number) {
    if(this.isEnd==true)this.timeEnd();
    this.m_fsm.step();
    if(this.state==GameState.PLAYING)
    {
      this.timeClock=this.timeClock+delta/1000;//Math.round(time/1000);
      proxy.emit(UPDATE_TIME,Math.round(this.timeClock));
      this.timeControlStarNum();
      this.freshStar(delta);
      if(this.isClimb==true)
      {
        this.l.setTo(this.player.x,this.player.y-58,this.targetStore.x,this.targetStore.y+26);
      }
    }
    if(this.timeClock>=15)
    {
      this.isEnd=true;
      this.isPlaying=false;
    }
    this.cloud.tilePositionX-=0.5;
  }
  clickStore(pointer,store){
    this.tips.setVisible(false);
      proxy.emit(CLICK_STORE,store);
  }
  climb(store){
    if(this.state==GameState.PLAYING)
    {
      this.targetStore=store;
      this.player.setClimbDir( this.targetStore.x-this.player.x,this.targetStore.y-this.player.y);
      this.isClimb=true;
      this.l.setVisible(true);
      this.moveSound.play();
      this.player.drag();
    }
  }
  createStores(){
    this.stores[0]=new Store(this,50,500,"store");
    this.stores[1]=new Store(this,250,200,"store");
    this.stores[2]=new Store(this,450,500,"store");
    this.stores[3]=new Store(this,650,200,"store");
    this.stores[4]=new Store(this,850,500,"store");
    for(let i=0;i<5;i++)
    {
      this.stores[i].setInteractive();
      this.physics.add.collider(this.player,this.stores[i]);
    }
  }
  touchGround(){
    this.l.setVisible(false);
  }
  createGrounds(){
    this.topgrounds=this.physics.add.staticGroup();
    for(let i=0;i<8;i++)
    {
      this.topgrounds.create(i*128,config.height-64,"topground");
    }
    this.physics.add.collider(this.player,this.topgrounds,this.touchGround,null,this);

  }
  createStar()
  {
    if(this.curStarNum<this.randomStarNum)
    {
      var star=new Star(this,250,400,"star");
      this.physics.add.collider(this.player,star,this.catchStar,null,this.player,star);
      this.curStarNum++;
    }
  }
  freshStar(delta){
    this.freshTime=this.freshTime+delta/1000;
    if(Math.floor(this.freshTime)>=2)
    {
      this.createStar();
      this.freshTime=0;
    }
  }
  timeControlStarNum(){
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
  catchStar(player,star){
    proxy.emit(CATCH_STAR,star);
  }
  destroyStar(star){
    star.destroy();
    this.curStarNum--;
    this.updateScore();
  }
  timeEnd(){
    proxy.emit(TIME_END,this.score);
  }
  restartThisScene(){
    proxy.off(CLICK_STORE,this.climb,this);
    proxy.off(CATCH_STAR,this.destroyStar,this);
    proxy.off(RESTART_PLAY,this.restartThisScene,this);
    this.scene.restart();
  }
  updateScore(){
    if(this.state==GameState.PLAYING)
    {
      this.scoreSound.play();
      this.score=this.score+10;
      proxy.emit(UPDATE_SCORE,this.score);
    }
  }

}


