export const CLICK_STORE="click_store";               //点击石头事件
export const CATCH_STAR="catch_star";                 //主角接触到星星事件
export const TIME_END="time_end";                     //时间计时结束事件
export const RESTART_PLAY="restart_play";             //重新开始游戏事件
export const UPDATE_SCORE="update_score";             //更新分数事件
export const UPDATE_TIME="update_time";               //更新时间事件
export const proxy=new Phaser.Events.EventEmitter();  //事件发射器
