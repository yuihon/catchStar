
import  Player from "../sprites/player";
import Store from "../sprites/store";
import { config } from "../game";
import { proxy,CLICK_STORE } from "../core/proxy";
export default class Play extends Phaser.Scene {
 public player;
 public Store;
 public l;
  constructor() {
    super("Play");
    
  }
  preload() {

  }
  create() {
      this.player=new Player(this,config.width/2,config.height-58,"player");
      this.player.setClimbForce(1.5);
      this.Store=new Store(this,500,500,"store");
      this.Store.setInteractive();
      this.input.on("gameobjectup",this.clickStore,this);
      this.physics.add.overlap(this.player,this.Store,this.playerStop,undefined,this);
      this.l=this.add.line(75,0,0,0,140,0,0xeb981b);
      this.l.setLineWidth(10,10);
      this.l.setVisible(false);
      proxy.on(CLICK_STORE,this.climb,this);
    }

  update() {
    this.l.setTo(this.player.x,this.player.y-58,this.Store.x,this.Store.y+26);
    this.player.setClimbDir( this.Store.x-this.player.x,this.Store.y-this.player.y);
  }
  clickStore(pointer,store){
    proxy.emit(CLICK_STORE,store);
  }
  climb(store){
    this.l.setVisible(true);
    this.player.drag();
  }
  playerStop(){
    this.l.setVisible(false);
    this.player.stopClimb();
  }
}


