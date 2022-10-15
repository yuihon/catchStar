export default class StateMachine implements IFSM{
    private m_initStateName:string;
    private m_curStateName:string;
    private m_states:Map<string,IState>;

    constructor(initialState:string,states:IState[]){
        this.m_initStateName=initialState;
        this.m_states=new Map<string,IState>();
        this.m_curStateName = '';

        for(let state of states){
            state.owner=this;
            this.m_states[state.name]=state;
        }
    }

    step(){
        if(0===this.m_curStateName.length){
            this.m_curStateName=this.m_initStateName;
            this.m_states[this.m_curStateName].enter();
        }

        this.m_states[this.m_curStateName].execute();
    }

    transition(newState: string){
        this.m_curStateName=newState;
        this.m_states[this.m_curStateName].enter();
    }
}