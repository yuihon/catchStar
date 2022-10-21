import { GameState } from "../scenes/play";
import BaseState from "./base";
export default class Playing extends BaseState{ //游戏进行状态
    enter(){
        super.enter();
        this.m_playScene.state=GameState.PLAYING; //当进入该状态时将Play场景的游戏状态设为游戏进行中
    }
    execute(){
        const fsm=this.owner;
        if(this.m_playScene.isEnd==true){  //切换到游戏结束状态
            fsm.transition('endplay');
            return;
        }
    }
}