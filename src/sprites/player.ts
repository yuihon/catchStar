import { CLICK_STORE,proxy } from "../core/proxy";

export default class Player extends Phaser.Physics.Arcade.Sprite{  //玩家类
    public climbDir;      //玩家拉力的方向
    public climbForce;    //玩家拉力的大小       

    constructor(scene,x,y,texture){
        super(scene,x,y,texture);
        //初始化玩家拉力的方向
        this.climbDir=new Phaser.Math.Vector2();
        //为玩家添加物理
        scene.physics.world.enableBody(this);
        this.setGravityY(600).setBounce(0.2);
        this.setCollideWorldBounds(true);
        scene.add.existing(this);
    }
    create(){
        
    }
    update(){

    }
    drag(){   //开始为玩家提供力的函数
        this.setVelocity(this.climbDir.x*this.climbForce,this.climbDir.y*this.climbForce);
    }
    setClimbDir(x,y){ //设置玩家力的方向的函数
        this.climbDir.x=x;
        this.climbDir.y=y;
    }
    setClimbForce(force){ //设置玩家力的大小的函数
        this.climbForce=force;
    }
}