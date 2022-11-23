import { ShipLaser } from "./ship-laser";
import { ShooterConstants } from "./shooter-constants";

export class Ship extends Phaser.GameObjects.Sprite  {
    deltaX: number;
    deltaY: number;
    lasers: any[];
    lastShot: number;
    shotFrequency: number;

    constructor(scene: Phaser.Scene, x: number , y: number) {
        super(scene, x, y, 'ship');
        this.setPosition(x, y);

        this.scene = scene;
        this.deltaX = 5;
        this.deltaY = 5;
        this.lasers = new Array();
        this.lastShot = new Date().getTime();
        this.shotFrequency = 250;
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

    fireLasers() {
        var currentTime = new Date().getTime();
        if (currentTime - this.lastShot > this.shotFrequency) {
            var shipLaser = new ShipLaser(this.scene, this.x, this.y);
            this.scene.add.existing(shipLaser);
            this.lasers.push(shipLaser);
            this.lastShot = currentTime;
        } 
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        var i = 0;
        var j = 0;
        var lasersToRemove = new Array(); 

        for (i = 0; i < this.lasers.length; i++) {
            this.lasers[i].update();

            if (this.lasers[i].y <= 0) {
                lasersToRemove.push(this.lasers[i]);
            }
        }

        for (j = 0; j < lasersToRemove.length; j++) {
            var laserIndex = this.lasers.indexOf(lasersToRemove[j]);
            this.lasers.splice(laserIndex, 1);
            lasersToRemove[j].destroy();
        }
    }
}