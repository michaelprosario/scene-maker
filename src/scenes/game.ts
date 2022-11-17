import Phaser from 'phaser';
import { InputController } from '../controllers/input-controller';
import { CharacterNode } from '../nodes/character-node';
import { GameMessageService } from '../playtime.core/services/game-message-service';

export default class Demo extends Phaser.Scene {

  gameMessageService: GameMessageService | undefined;
  inputController: InputController | undefined;

  team1: CharacterNode | undefined;
  team2: CharacterNode | undefined;
  team3: CharacterNode | undefined;
  team4: CharacterNode | undefined;

  constructor() {
    super('GameScene');
  }

  preload() {    
    this.load.image('team1', '../assets/images/team1.png');    
    this.load.image('team2', '../assets/images/team2.png');    
    this.load.image('team3', '../assets/images/team3.png');    
    this.load.image('team4', '../assets/images/team4.png');    
    this.load.image('boss', '../assets/images/boss.png'); 
  }

  create() {
    this.gameMessageService = new GameMessageService();
    this.inputController = new InputController(this, this.gameMessageService);

    this.team1 = new CharacterNode(this, this.gameMessageService, "team1");
    this.team2 = new CharacterNode(this, this.gameMessageService, "team2");
    this.team3 = new CharacterNode(this, this.gameMessageService, "team3");
    this.team4 = new CharacterNode(this, this.gameMessageService, "team4");
    this.team1.start();
  }

  update(time: number, delta: number): void 
  {
    this.inputController?.update(time,delta);
    this.gameMessageService?.update(time,delta);    
  }
}
