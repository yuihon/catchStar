
export default class Store extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);
        scene.physics.world.enableBody(this);
        this.setPushable(false);
        scene.add.existing(this);
    }
    update(){
       
    }
}