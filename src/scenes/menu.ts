import { config } from "../game";
export default class Menu extends Phaser.Scene { //游戏主菜单场景类
    public playButton;       //开始游戏的按钮
    private bgmSound;        //游戏的背景音乐
    constructor() {
      super("Menu");
  
    }
    preload() {
      //载入游戏所需资源
       this.load.image("gameName","../../public/assets/images/gamename.png");
       this.load.image("play","../../public/assets/images/play.png");
       this.load.image("store","../../public/assets/images/store.png");
       this.load.image("topground","../../public/assets/images/topground.png");
       this.load.image("tryagain","../../public/assets/images/tryagain.png");
       this.load.image("gameover","../../public/assets/images/gameover.png");
       this.load.image("cloud","../../public/assets/images/cloud.png");
       this.load.image("tips","../../public/assets/images/tips.png");
       this.load.image("circle","../../public/assets/images/circle.png");
       this.load.image("fullScreenBtn","../../public/assets/images/fullScreenButton.png");

       this.load.spritesheet("player","../../public/assets/images/player.png",{
        frameWidth:100,
        frameHeight:116
       });
       this.load.spritesheet("star","../../public/assets/images/star.png",{
        frameWidth:100,
        frameHeight:100
       });
       this.load.audio("audio_move",["../../public/assets/sounds/move.ogg","../../public/assets/sounds/move.mp3"]);
       this.load.audio("audio_score",["../../public/assets/sounds/score.ogg","../../public/assets/sounds/score.mp3"]);
       this.load.audio("audio_bgm","../../public/assets/sounds/bgm.mp3");
    }
    create() {
        console.log("menu create");
        //创建不同的星星动画
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
        //播放背景音乐
        this.bgmSound=this.sound.add("audio_bgm");
        var musicConfig={
          mute:false,
          volume:0.1,
          rate:1,
          detune:0,
          seek:0,
          loop:true,
          delay:0
        }
        this.bgmSound.play(musicConfig);
    }
  
    update() {
      this.add.image(config.width/2,166,"gameName");   //在主菜单上添加展示游戏名称的图片
      //为开始游戏按钮添加鼠标点击事件，使其能开始Play场景
      this.playButton=this.add.image(config.width/2,config.height-150,'play').setInteractive();
      this.playButton.on("pointerdown",()=>{
        this.scene.start("Play");
      })
    }
  }