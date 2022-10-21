import { GameState } from "../scenes/play";
import BaseState from "./base";
export default class EndPlay extends BaseState{  //游戏结束状态
    enter(){
        super.enter();
        this.m_playScene.state=GameState.End;//当进入该状态时，将Play场景的游戏状态设为游戏结束
    }
    execute(){
        const fsm=this.owner;
        if(this.m_playScene.isPlaying==true){ //切换到游戏进行状态
            fsm.transition('playing');
            return;
        }
    }
}