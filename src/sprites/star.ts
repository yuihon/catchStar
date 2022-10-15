export default class Star extends Phaser.GameObjects.Sprite{
    public floatPosition;
    public randomNum;
    public randomSkin;
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);
        this.floatPosition=[];
        this.randomNumber();
        this.x=this.floatPosition[this.randomNum].x;
        this.y=this.floatPosition[this.randomNum].y;
        if(this.randomSkin==0)
        {
            this.play("changeStar1");
        }
        else if(this.randomSkin==1)
        {
            this.play("changeStar2");
        }
        else
        {
            this.play("changeStar3");
        }
        scene.physics.world.enableBody(this);
        scene.add.existing(this);
    }
    update(){
       
    }
    randomNumber(){
        this.floatPosition[0]=new Phaser.Math.Vector2(Phaser.Math.Between(250,850),Phaser.Math.Between(300,400));
        this.floatPosition[1]=new Phaser.Math.Vector2(Phaser.Math.Between(250,850),600);
        this.randomNum=Phaser.Math.Between(0,1);
        this.randomSkin=Phaser.Math.Between(0,2);
    }
}