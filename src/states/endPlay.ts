import { GameState } from "../scenes/play";
import BaseState from "./base";
export default class EndPlay extends BaseState{
    enter(){
        super.enter();
        this.m_playScene.state=GameState.End;
    }
    execute(){
        const fsm=this.owner;
        if(this.m_playScene.isPlaying==true){
            fsm.transition('playing');
            return;
        }
    }
}