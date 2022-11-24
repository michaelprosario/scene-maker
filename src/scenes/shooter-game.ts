import { Enemy1 } from '../space-shooter/enemy1';
import { Ship } from '../space-shooter/ship';

export class ShooterGame extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  myShip: any;
  enemies!: Phaser.Physics.Arcade.Group;
  enemies2!: any[];
  enemy: any;

  constructor(config: any) {
    super(config);
  }

  preload() {
    this.load.image('ship', 'assets/SpaceShooterRedux/PNG/playerShip1_orange.png');
    this.load.image('laser', 'assets/SpaceShooterRedux/PNG/Lasers/laserBlue01.png');
    this.load.image('enemy1', 'assets/SpaceShooterRedux/PNG/Enemies/enemyBlack3.png');
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.myShip = new Ship(this, 400, 500);
    this.add.existing(this.myShip);
    this.enemies = this.physics.add.group();
    this.enemies2 = new Array();

    let k = 0;
    for (k = 0; k < 21; k++) {
      let x = Math.random() * 800;
      let y = Math.random() * 400;

      this.enemy = new Enemy1(this, x, y);
      this.add.existing(this.enemy);
      this.enemies.add(this.enemy);
      this.enemies2.push(this.enemy);
    }

  }

  update() {
    if (this.cursors.left.isDown) {
      this.myShip.moveLeft();
    }

    if (this.cursors.right.isDown) {
      this.myShip.moveRight();
    }

    if (this.cursors.up.isDown) {
      this.myShip.moveUp();
    }

    if (this.cursors.down.isDown) {
      this.myShip.moveDown();
    }

    if (this.cursors.space.isDown) {
      this.myShip.fireLasers();
    }

    this.myShip.update();

    let j = 0;
    for (j = 0; j < this.enemies2.length; j++) {
      let enemy = this.enemies2[j];
      enemy.update();
    }
  }
}
