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
       this.load.image("topground","../../public/assets/images/topground.png");
       this.load.image("tryagain","../../public/assets/images/tryagain.png");
       this.load.image("gameover","../../public/assets/images/gameover.png");
       this.load.spritesheet("player","../../public/assets/images/player.png",{
        frameWidth:100,
        frameHeight:116
       });
       this.load.spritesheet("star","../../public/assets/images/star.png",{
        frameWidth:100,
        frameHeight:100
       });
    }
    create() {
        console.log("menu create");
        this.anims.create({
          key:"changeStar1",
          frames:this.anims.generateFrameNames("star",{
            start:0,
            end:0
          }),
          frameRate:10,
          repeat:-1
        });
        this.anims.create({
          key:"changeStar2",
          frames:this.anims.generateFrameNames("star",{
            start:1,
            end:1
          }),
          frameRate:10,
          repeat:-1
        });
        this.anims.create({
          key:"changeStar3",
          frames:this.anims.generateFrameNames("star",{
            start:2,
            end:2
          }),
          frameRate:10,
          repeat:-1
        });
    }
  
    update() {
      this.add.image(config.width/2,166,"gameName");
      this.playButton=this.add.image(config.width/2,config.height-150,'play').setInteractive();
      this.playButton.on("pointerdown",()=>{
        this.scene.start("Play");
      })
    }
  }