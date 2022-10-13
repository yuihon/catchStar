import Phaser from 'phaser';
import Play from "./scenes/play.js";
import Menu from './scenes/menu.js';
export const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 1200,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: "mygame",
    physics: {
        default: 'arcade',
        debug:true
    },
    backgroundColor: '#4488aa',
    scene: [Menu,Play]
};
 
export default new Phaser.Game(config);