declare interface IState{
    get name():string;
    get owner():IFSM;
    set owner(val:IFSM);

    enter() :void;
    execute() :void;
}

declare interface IFSM{
    step():void;
    transition(newState:string):void;
}