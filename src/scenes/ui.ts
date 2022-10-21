import { config } from "../game";
import { proxy,CLICK_STORE,CATCH_STAR,TIME_END,RESTART_PLAY,UPDATE_SCORE,UPDATE_TIME} from "../core/proxy";
export default class Ui extends Phaser.Scene { //UI场景类
    private tryagain;            //提示玩家是否重新游戏的图片
    private playButton;          //重新开始游戏的按钮
    private gameover;            //游戏结束文字的图片
    private textScore;           //分数文本
    private textTime;            //时间文本
    private textFinalScore;      //游戏结束最终显示的分数文本
    private fullScreenBtn;       //全屏按钮
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
        this.playButton.on("pointerdown",()=>{            //当点击重新开始游戏的按钮时触发RESTART_PLAY事件，并且当场景重新开始前将订阅的事件清除
            proxy.emit(RESTART_PLAY);
            proxy.off(TIME_END,this.setEndUI,this);
            proxy.off(UPDATE_SCORE,this.updateScore,this);
            proxy.off(UPDATE_TIME,this.updateTime,this);
            this.scene.restart();

          });
        this.fullScreenBtn.on('pointerdown',()=>{         //点击全屏按钮时，使游戏全屏
            if(this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
                this.scale.startFullscreen();
            }
        });
        proxy.on(TIME_END,this.setEndUI,this);            //订阅启动游戏结束UI的事件
        proxy.on(UPDATE_SCORE,this.updateScore,this);     //订阅更新分数事件
        proxy.on(UPDATE_TIME,this.updateTime,this);       //订阅更新时间事件
    }
    update(time: number, delta: number): void {
        
    }
    setEndUI(score){
        //将游戏结束时，游戏结束的UI都显示出来
        this.tryagain.setVisible(true);
        this.playButton.setVisible(true);
        this.gameover.setVisible(true);
        this.textTime.setVisible(false);
        this.textScore.setVisible(false);
        this.textFinalScore.text=`最终得分:${score}`
        this.textFinalScore.setVisible(true);
    }
    updateScore(score){ //更新得分文本
        this.textScore.text=`Score:${score}`;
    }
    updateTime(time){  //更新时间文本
        this.textTime.text=`Time:${time}`;
    }
}