
export default class Store extends Phaser.Physics.Arcade.Sprite{ //石头类
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);
        scene.physics.world.enableBody(this);
        this.setPushable(false); //使场景里的石头不会被主角推动
        scene.add.existing(this);
    }
    update(){
       
    }
}