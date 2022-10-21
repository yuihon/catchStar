export default class Star extends Phaser.GameObjects.Sprite{   //星星类
    public floatPosition;  //星星随机出现的位置
    public randomNum;      //星星主要出现的区域范围有两个块，randomNum用于星星随机哪一块出现
    public randomSkin;     //星星的皮肤随机
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);
        this.floatPosition=[];
        this.randomNumber();                        //随机出星星的位置
        //为星星设置随机的位置
        this.x=this.floatPosition[this.randomNum].x;
        this.y=this.floatPosition[this.randomNum].y;
        //通过播放动画来改变星星随机的皮肤
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
    randomNumber(){  //随机星星出现位置的函数
        //在星星能够出现的两块区域范围内每个区域个随机出坐标
        this.floatPosition[0]=new Phaser.Math.Vector2(Phaser.Math.Between(250,850),Phaser.Math.Between(300,400));
        this.floatPosition[1]=new Phaser.Math.Vector2(Phaser.Math.Between(250,850),600);
        //随机决定星星出现在哪一块区域
        this.randomNum=Phaser.Math.Between(0,1);
        //随机决定星星的皮肤
        this.randomSkin=Phaser.Math.Between(0,2);
    }
}