import { CLICK_STORE,proxy } from "../core/proxy";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    public climbDir;
    public climbForce;
    public sence;

    constructor(scene,x,y,texture){
        super(scene,x,y,texture);
        this.sence=scene;
        this.climbDir=new Phaser.Math.Vector2();
        scene.physics.world.enableBody(this);
        this.setGravityY(600).setBounce(0.2);
        this.setCollideWorldBounds(true);
        scene.add.existing(this);
    }
    create(){
        
    }
    update(){

    }
    drag(){
        this.setVelocity(this.climbDir.x*this.climbForce,this.climbDir.y*this.climbForce);
    }
    setClimbDir(x,y){
        this.climbDir.x=x;
        this.climbDir.y=y;
    }
    setClimbForce(force){
        this.climbForce=force;
    }
    stopClimb(){
        this.setVelocity(0,0);
    }
}