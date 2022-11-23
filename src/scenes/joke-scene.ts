
import Phaser from 'phaser';
import { InputController } from '../controllers/input-controller';
import { CharacterNode } from '../nodes/character-node';
import { SceneCommand } from '../playtime.core/commands/commands';
import { GameMessageService } from '../playtime.core/services/game-message-service';

export default class JokeScene extends Phaser.Scene {

  gameMessageService!: GameMessageService;
  inputController!: InputController;

  boss!: CharacterNode;
  team1!: CharacterNode;
  team2!: CharacterNode;
  team3!: CharacterNode;
  team4!: CharacterNode;  
  sceneActions: SceneCommand[] = [];
  currentCommandIndex: number = 0;

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
    this.inputController = new InputController(this, this.gameMessageService as GameMessageService);

    this.setTheStage();   
    const delay = 3000;
    this.setupSceneActions(delay);
    this.executeActions(this.sceneActions);
  }

  private setupSceneActions(delay: number) {
    this.sceneActions = [
      new SceneCommand(this.boss, this.boss.glideToPoint, delay, [50, 250, delay, 0]),
      new SceneCommand(this.boss, this.boss.say, delay, [100, 100, "Any good jokes?", delay]),
      new SceneCommand(this.team1, this.team1.say, delay, [100, 100, "What do you call it when Dumbledor farts?", delay]),
      new SceneCommand(this.team2, this.team2.say, delay, [100, 100, "What? What?", delay]),
      new SceneCommand(this.team1, this.team1.say, delay, [100, 100, "The odor of the Phoenix", delay]),
      new SceneCommand(this.boss, this.boss.say, delay, [100, 100, "Hahahaha!!", delay]),
      new SceneCommand(this.team3, this.team3.say, delay, [100, 100, "That was so bad! @#$#@", delay]),
      new SceneCommand(this.team4, this.team4.say, delay, [100, 100, "Me farts!", delay]),
      new SceneCommand(this.team3, this.team3.say, delay, [100, 100, "We know", delay]),
    ];
  }

  private setTheStage() 
  {
    this.boss = new CharacterNode(this, this.gameMessageService, "boss");
    this.team1 = new CharacterNode(this, this.gameMessageService, "team1");
    this.team2 = new CharacterNode(this, this.gameMessageService, "team2");
    this.team3 = new CharacterNode(this, this.gameMessageService, "team3");
    this.team4 = new CharacterNode(this, this.gameMessageService, "team4");

    this.boss.setScale(0.5);
    this.boss.setLocation(-100, 300);
    this.team1.setLocation(200, 300);
    this.team1.setScale(0.3);

    this.team2.setLocation(350, 300);
    this.team2.setScale(0.4);
    this.team3.setLocation(500, 300);
    this.team3.setScale(0.4);
    this.team4.setLocation(700, 300);
    this.team4.setScale(0.4);
  }

  executeActions(commands: SceneCommand[])
  {
    let timeIndex = 0;
    for(const currentCommand of commands)
    {
      timeIndex = timeIndex + currentCommand.timeSpan;
      setTimeout(() => 
      {      
        currentCommand.someMethod.apply(currentCommand.instance, currentCommand.args);             
      }, timeIndex)  
    }
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
