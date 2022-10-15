import Play from "../scenes/play";

export default class BaseState implements IState{
    protected m_fsm:IFSM;
    protected m_playScene:Play;
    constructor(playScene:Play){
        this.m_playScene=playScene;
    }
    get name():string{
        return this.constructor.name.toLowerCase();
    }

    get owner():IFSM{
        return this.m_fsm;
    }

    set owner(val:IFSM){
        this.m_fsm=val;
    }

    enter():void{
        console.log(`enter:${this.name}`);
    }

    execute():void{

    }
}