import { config } from "../game";
import { proxy,CLICK_STORE,CATCH_STAR,TIME_END,RESTART_PLAY,UPDATE_SCORE,UPDATE_TIME} from "../core/proxy";
export default class Ui extends Phaser.Scene {
    private tryagain;
    private playButton;
    private gameover;
    private textScore;
    private textTime;
    private textFinalScore;
    private pauseButton;
    private isPauseButtonPress;
    private fullScreenBtn;
    constructor() {
        super("UI");
      }
    create(){
        this.tryagain=this.add.image(500,500,"tryagain");
        this.playButton=this.add.image(500,800,"play");
        this.gameover=this.add.image(500,150,"gameover");
        this.textScore=this.add.text(10,10,"得分:0",{font:'32px Arial'});
        this.textTime=this.add.text(500,10,"时间:0",{font:'32px Arial'});
        this.fullScreenBtn=this.add.image(790,10,"fullScreenBtn");
        this.fullScreenBtn.setOrigin(0,0).setScale(5,5);
        this.fullScreenBtn.setInteractive();
        this.textFinalScore=this.add.text(300,300,"最终得分:0",{font:'100px Arial'});
        this.textFinalScore.setColor("Black");
        this.textFinalScore.setVisible(false);
        this.tryagain.setVisible(false);
        this.playButton.setVisible(false);
        this.gameover.setVisible(false);
        this.playButton.setInteractive();
        this.playButton.on("pointerdown",()=>{
            proxy.emit(RESTART_PLAY);
            proxy.off(TIME_END,this.setEndUI,this);
            proxy.off(UPDATE_SCORE,this.updateScore,this);
            proxy.off(UPDATE_TIME,this.updateTime,this);
            this.scene.restart();

          });
        this.fullScreenBtn.on('pointerdown',()=>{
            if(this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
                this.scale.startFullscreen();
            }
        });
        proxy.on(TIME_END,this.setEndUI,this);
        proxy.on(UPDATE_SCORE,this.updateScore,this);
        proxy.on(UPDATE_TIME,this.updateTime,this);
    }
    update(time: number, delta: number): void {
        
    }
    setEndUI(score){
        this.tryagain.setVisible(true);
        this.playButton.setVisible(true);
        this.gameover.setVisible(true);
        this.textTime.setVisible(false);
        this.textScore.setVisible(false);
        this.textFinalScore.text=`最终得分:${score}`
        this.textFinalScore.setVisible(true);
    }
    updateScore(score){
        this.textScore.text=`Score:${score}`;
    }
    updateTime(time){
        this.textTime.text=`Time:${time}`;
    }
}