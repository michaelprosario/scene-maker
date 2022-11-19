import { GameNode } from "../playtime.core/entities/game-node";
import { MessageTopics } from "../playtime.core/enums/message-topics";
import { MathHelper } from "../playtime.core/helpers/math-helper";
import { GameMessageService } from "../playtime.core/services/game-message-service";
import { GameMessage } from "../playtime.core/value-objects/game-message";

export class CharacterNode extends GameNode
{

    
    phaserSprite: Phaser.GameObjects.Sprite;
    forwardAngle: number = 0;
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

    changeX(deltaX: number){
        this.phaserSprite.x += deltaX;
    }

    changeY(deltaX: number){
        this.phaserSprite.x += deltaX;
    }

    move(steps: number)
    {        
        let angleInRadians = MathHelper.getRadiansFromDegrees(this.forwardAngle);
        let deltaX = steps * Math.cos(angleInRadians);
        let deltaY = steps * Math.sin(angleInRadians);

        // store new point
        this.phaserSprite.x += deltaX;
        this.phaserSprite.y += deltaY;        
    }

    turn(angle: number)
    {
        this.forwardAngle = this.forwardAngle + angle;
        this.phaserSprite.rotation = this.forwardAngle;
    }

    show(){
        this.phaserSprite.visible = true;
    }

    setAngle(angle: number) {
        this.forwardAngle = angle
    }

    hide(){
        this.phaserSprite.visible = false;
    }    

    glideToPointAngle(x: number, y: number, duration: number, angle: number){        
        this.scene.tweens.add({
            targets: this.phaserSprite,
            angle: angle, 
            x: x,
            y: y,
            ease: "Linear", 
            duration: duration,
            repeat: 0,
            yoyo: false
        });

        this.setAngle(angle);
    }        
    
    start() 
    {
        
    }
    
    update(time: number, delta: number) 
    {
        
    }

}