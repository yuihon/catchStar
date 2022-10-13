import { CLICK_STORE,proxy } from "../core/proxy";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);

        scene.physics.world.enableBody(this);
        this.setGravityY(600).setBounce(0.2);
        this.setCollideWorldBounds(true);
        scene.add.existing(this);
    }
    create(){
        proxy.on(CLICK_STORE,this.climb,this);
    }
    climb(){
        this.setVelocityY(-100);
    }

}