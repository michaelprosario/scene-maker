import Phaser from 'phaser';
import { InputController } from '../controllers/input-controller';
import { CharacterNode } from '../nodes/character-node';
import { GameMessageService } from '../playtime.core/services/game-message-service';

export default class Demo extends Phaser.Scene {

  gameMessageService: GameMessageService | undefined;
  inputController: InputController | undefined;

  boss!: CharacterNode;
  team1!: CharacterNode;
  team2!: CharacterNode;
  team3!: CharacterNode;
  team4!: CharacterNode;  

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
    this.boss = new CharacterNode(this, this.gameMessageService, "boss");
    this.team1 = new CharacterNode(this, this.gameMessageService, "team1");
    this.team2 = new CharacterNode(this, this.gameMessageService, "team2");
    this.team3 = new CharacterNode(this, this.gameMessageService, "team3");
    this.team4 = new CharacterNode(this, this.gameMessageService, "team4");
    
    this.inputController = new InputController(this, this.gameMessageService as GameMessageService);

    
    this.boss.setScale(0.5);
    this.boss.setLocation(100,300);

    this.team1.setScale(0.3);
    this.team1.setLocation(300,300);
    
    this.team2.setScale(0.4);
    this.team2.setLocation(450,300);

    this.team3.setScale(0.4);
    this.team3.setLocation(600,300);

    this.team4.setScale(0.4);
    this.team4.setLocation(800,300);


    this.team1.setAngle(0);
    this.team1.glideToPointAngle(0,0,5000, 360)
    //this.team1.glide(300,300,5000, 360)
    //this.turnStuff();

    setTimeout(() => {
      this.team1.glideToPointAngle(300,300,5000, 360)
    }, 5000);
  }

  turnStuff()
  {
    this.team1.turn(10);
    this.team1.move(2);

    this.team4.turn(30);
    this.team4.move(2);

    setTimeout(() => this.turnStuff(),50);
  }

  update(time: number, delta: number): void 
  {
    this.inputController?.update(time,delta);
    this.gameMessageService?.update(time,delta);  
    
    this.team1.update(time, delta);
    this.team2.update(time, delta);
    this.team3.update(time, delta);
    this.team4.update(time, delta);
  }
}
