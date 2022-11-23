import Phaser from 'phaser';
import config from './config';
import JokeScene from './scenes/joke-scene';
import { ShooterGame } from './scenes/shooter-game';

new Phaser.Game(
  Object.assign(config, {
    scene: [ShooterGame]
  })
);
