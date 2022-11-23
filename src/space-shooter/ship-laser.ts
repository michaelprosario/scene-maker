export class ShipLaser extends Phaser.GameObjects.Sprite {
    speed: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'laser');
        this.setPosition(x, y);
        this.speed = 10;
        this.scene = scene;
        scene.physics.world.enable(this);
        scene.physics.add.collider(this, scene.enemies, this.handleHit, null, this);
    }

    handleHit(laserSprite: Phaser.GameObjects.Sprite, enemySprite: Phaser.GameObjects.Sprite) {
        enemySprite.destroy(true);
        laserSprite.destroy(true);
    }

    preUpdate(time: number, delta: number) {
        if(this.active == false){return;}
        super.preUpdate(time, delta);
        this.y -= this.speed;
    }
}