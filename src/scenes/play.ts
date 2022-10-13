import  Player from "../sprites/player";
import Store from "../sprites/store";
import { config } from "../game";
import { proxy,CLICK_STORE } from "../core/proxy";
export default class Play extends Phaser.Scene {
 public player;
 public Store;
  constructor() {
    super("Play");
  }
  preload() {

  }
  create() {
      this.player=new Player(this,config.width/2,config.height-58,"player");
      this.Store=new Store(this,500,500,"store");
      this.Store.setInteractive();
      this.input.on("gameobjectup",this.clickStore,this);
      proxy.on(CLICK_STORE,this.climb,this);
    }

  update() {
    
  }
  clickStore(pointer,store){
    proxy.emit(CLICK_STORE,store);
  }
  climb(store){
    console.log(store.x);
    this.player.setVelocityY(-1000);
}
}


