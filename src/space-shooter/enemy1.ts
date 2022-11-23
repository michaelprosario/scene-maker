import { ShooterConstants } from "./shooter-constants";

export class Enemy1 extends Phaser.GameObjects.Sprite {
    deltaX: number;
    deltaY: number;
    gameObject: this;
    constructor(scene, x: number, y: number) {
        super(scene, x, y, 'enemy1');
        this.setPosition(x, y);
        scene.physics.world.enable(this);

        this.gameObject = this;
        this.deltaX = 3;
        this.deltaY = 3;
    }

    update() {
        let k = Math.random() * 4;
        k = Math.round(k);

        if (k == 0) {
            //this.moveUp();
        }
        else if (k == 2) {
            this.moveLeft();
        }
        else if (k == 3) {
            this.moveRight();
        }
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.deltaX;
        }
    }

    moveRight() {
        if (this.x < ShooterConstants.SCREEN_WIDTH) {
            this.x += this.deltaX;
        }
    }

    moveUp() {
        if (this.y > 0) {
            this.y -= this.deltaY;
        }
    }

    moveDown() {

        if (this.y < ShooterConstants.SCREEN_HEIGHT) {
            this.y += this.deltaY;
        }
    }
}
