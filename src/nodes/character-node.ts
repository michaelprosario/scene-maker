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
    

    // https://phaser.io/examples/v3/view/game-objects/text/speech-bubble#
    say(width: number, height: number, quote: string, timeToDisplay: number)
    {
        var bubbleWidth = width;
        var bubbleHeight = height;
        var bubblePadding = 10;
        var arrowHeight = bubbleHeight / 4;
    
        var bubble = this.scene.add.graphics({ x: this.phaserSprite.x, y: this.phaserSprite.y - 200});
    
        //  Bubble shadow
        bubble.fillStyle(0x222222, 0.5);
        bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);
    
        //  Bubble color
        bubble.fillStyle(0xffffff, 1);
    
        //  Bubble outline line style
        bubble.lineStyle(4, 0x565656, 1);
    
        //  Bubble shape and outline
        bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
        bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    
        //  Calculate arrow coordinates
        var point1X = Math.floor(bubbleWidth / 7);
        var point1Y = bubbleHeight;
        var point2X = Math.floor((bubbleWidth / 7) * 2);
        var point2Y = bubbleHeight;
        var point3X = Math.floor(bubbleWidth / 7);
        var point3Y = Math.floor(bubbleHeight + arrowHeight);
    
        //  Bubble arrow shadow
        bubble.lineStyle(4, 0x222222, 0.5);
        bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);
    
        //  Bubble arrow fill
        bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
        bubble.lineStyle(2, 0x565656, 1);
        bubble.lineBetween(point2X, point2Y, point3X, point3Y);
        bubble.lineBetween(point1X, point1Y, point3X, point3Y);
    
        var content = this.scene.add.text(0, 0, quote, { fontFamily: 'Arial', color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });
    
        var b = content.getBounds();
    
        content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));

        setTimeout(() => {
            content.destroy();
            bubble.destroy();
        }, timeToDisplay);
    }    
    
    start() 
    {
        
    }
    
    update(time: number, delta: number) 
    {
        
    }

}