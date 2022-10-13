import { config } from "../game";
export default class Menu extends Phaser.Scene {
    public playButton;
    constructor() {
      super("Menu");
  
    }
    preload() {
       this.load.image("gameName","../../public/assets/images/gamename.png");
       this.load.image("play","../../public/assets/images/play.png");
       this.load.image("store","../../public/assets/images/store.png");
       this.load.image("bottomground","../../public/assets/images/bottomground.png");
       this.load.image("topground","../../public/assets/images/topground.png");
       this.load.spritesheet("player","../../public/assets/images/player.png",{
        frameWidth:100,
        frameHeight:116
       });
    }
    create() {
        console.log("menu create");
    }
  
    update() {
      this.add.image(config.width/2,166,"gameName");
      this.playButton=this.add.image(config.width/2,config.height-150,'play').setInteractive();
      this.playButton.on("pointerdown",()=>{
        this.scene.start('Play');
      })
    }
  }