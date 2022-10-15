import BaseState from "./base";
export default class Playing extends BaseState{
    enter(){
        super.enter();
        const playScene=this.m_playScene;
        playScene.isEnd=false;
        playScene.isPlaying=true;
    }
    execute(){
        const fsm=this.owner;
        if(this.m_playScene.isEnd==true){
            fsm.transition('endplay');
            return;
        }
    }
}