import { GameState } from "../scenes/play";
import BaseState from "./base";
export default class Playing extends BaseState{
    enter(){
        super.enter();
        this.m_playScene.state=GameState.PLAYING;
    }
    execute(){
        const fsm=this.owner;
        if(this.m_playScene.isEnd==true){
            fsm.transition('endplay');
            return;
        }
    }
}