import { GameNode } from "../playtime.core/entities/game-node";
import { MessageTopics } from "../playtime.core/enums/message-topics";
import { GameMessageService } from "../playtime.core/services/game-message-service";
import { GameMessage } from "../playtime.core/value-objects/game-message";

export class CharacterNode extends GameNode
{
    
    phaserSprite: Phaser.GameObjects.Sprite;
    constructor(        
        private scene: Phaser.Scene, 
        private messageService: GameMessageService,
        private imageId: string
    )
    {
        super();
        if(!imageId) throw new Error("imageId is required");
        if(!messageService) throw new Error("messageService is required");        
        if(!scene) throw new Error("scene is required");
                
        this.phaserSprite = scene.add.sprite(0, 0, imageId);        
        this.messageService.subscribe(this, MessageTopics.SceneEvents);        
    }

    receiveMessage(message: GameMessage) {
        
    }
    
    setLocation(x: number, y: number) {
      this.phaserSprite.setX(x);
      this.phaserSprite.setY(y);
    }

    setScale(scale: number) 
    {
        if(scale <= 0)
            throw new Error("Scale should be postive");
            
        this.phaserSprite.scale = scale;        
    }    

    start() 
    {
        
    }
    
    update(time: number, delta: number) 
    {
        
    }

}