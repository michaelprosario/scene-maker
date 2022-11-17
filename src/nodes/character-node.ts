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
                
        let startX = 500 * Math.random();
        let startY = 500 * Math.random();

        this.phaserSprite = scene.add.sprite(startX, startY, imageId);
        this.phaserSprite.scale = 0.5
        this.phaserSprite.x = startX;
        this.phaserSprite.y = startY;
        this.messageService.subscribe(this, MessageTopics.SceneEvents);        
    }

    receiveMessage(message: GameMessage) {
        
    }
    
    start() 
    {
        
    }
    
    update(time: number, delta: number) 
    {
        
    }

}