import Phaser from 'phaser';
import { InputController } from '../controllers/input-controller';
import { CharacterNode } from '../nodes/character-node';
import { GameMessageService } from '../playtime.core/services/game-message-service';

export default class Demo extends Phaser.Scene {

  gameMessageService: GameMessageService | undefined;
  inputController: InputController | undefined;

  boss: CharacterNode | undefined;
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

    //this.boss = new CharacterNode(this, this.gameMessageService, "boss");
    this.team1 = new CharacterNode(this, this.gameMessageService, "team1");
    this.team1.setScale(0.3);
    this.team1.setLocation(400,300);
    
    this.team2 = new CharacterNode(this, this.gameMessageService, "team2");
    this.team2.setScale(0.4);
    this.team2.setLocation(550,300);

    this.team3 = new CharacterNode(this, this.gameMessageService, "team3");
    this.team3.setScale(0.4);
    this.team3.setLocation(700,300);

    setTimeout(() => {
        this.team1?.move(-20);
    }, 5000);
    
  }

  update(time: number, delta: number): void 
  {
    this.inputController?.update(time,delta);
    this.gameMessageService?.update(time,delta);  
    
    this.team1?.update(time, delta);
    this.team2?.update(time, delta);
    this.team3?.update(time, delta);
    this.team4?.update(time, delta);

     
  }
}
