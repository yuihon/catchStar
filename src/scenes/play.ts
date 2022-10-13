import Star from "../sprites/star";
import  Player from "../sprites/player";
import Store from "../sprites/store";
import { config } from "../game";
import { proxy,CLICK_STORE } from "../core/proxy";
export default class Play extends Phaser.Scene {
 public player;
 public stores;
 public targetStore;
 public l;
 public isClimb;
 public topgrounds;
 public stars;
 public randomStarNum;
  constructor() {
    super("Play");
    this.stores=[];
    this.stars=[];
  }
  preload() {

  }
  create() {
      this.player=new Player(this,config.width/2,config.height-314,"player");
      this.player.setClimbForce(1.8);

      this.createStores();
      this.createGrounds();
      this.randomStar();
      this.createStars();
      

      this.input.on("gameobjectup",this.clickStore,this);
      this.l=this.add.line(75,0,0,0,140,0,0xeb981b);
      this.l.setLineWidth(10,10);
      this.l.setVisible(false);
      this.isClimb=false;
      proxy.on(CLICK_STORE,this.climb,this);
    }

  update() {
    if(this.isClimb==true)
    {
      this.l.setTo(this.player.x,this.player.y-58,this.targetStore.x,this.targetStore.y+26);
      
    }
  }
  clickStore(pointer,store){
      proxy.emit(CLICK_STORE,store);
  }
  climb(store){
    this.targetStore=store;
    this.player.setClimbDir( this.targetStore.x-this.player.x,this.targetStore.y-this.player.y);
    this.isClimb=true;
    this.l.setVisible(true);
    this.player.drag();
  }
  createStores(){
    this.stores[0]=new Store(this,50,500,"store");
    this.stores[1]=new Store(this,250,200,"store");
    this.stores[2]=new Store(this,450,500,"store");
    this.stores[3]=new Store(this,650,200,"store");
    this.stores[4]=new Store(this,850,500,"store");
    // this.stores[5]=new Store(this,750,200,"store");
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
  createStars()
  {
    for(let i=0;i<this.randomStarNum;i++)
    {
      this.stars[i]=new Star(this,250,400,"star");
    }
  }
  randomStar(){
     this.randomStarNum=5;
  }
}


