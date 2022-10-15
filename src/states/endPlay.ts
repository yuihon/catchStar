import BaseState from "./base";
export default class EndPlay extends BaseState{
    enter(){
        super.enter();
        const playScene=this.m_playScene;
        playScene.isEnd=true;
        playScene.isPlaying=false;
    }
    execute(){
        const fsm=this.owner;
        if(this.m_playScene.isPlaying==true){
            fsm.transition('playing');
            return;
        }
    }
}