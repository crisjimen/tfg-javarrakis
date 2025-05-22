const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#fff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

let player;
let cursors;

function preload() {
  this.load.spritesheet('main_player', 'assets/main_player.png', {
    frameWidth: 52,
    frameHeight: 102
  });
}

function create() {
  player = this.physics.add.sprite(400, 300, 'main_player', 0); // Frame 0: idle

  cursors = this.input.keyboard.createCursorKeys();

  // Animaciones
  this.anims.create({
    key: 'walk_right',
    frames: this.anims.generateFrameNumbers('main_player', { start: 1, end: 4 }),
    frameRate: 8,
    repeat: -1
  });

  this.anims.create({
    key: 'walk_left',
    frames: this.anims.generateFrameNumbers('main_player', { start: 5, end: 8 }),
    frameRate: 8,
    repeat: -1
  });

  this.anims.create({
    key: 'walk_down',
    frames: this.anims.generateFrameNumbers('main_player', { start: 9, end: 12 }),
    frameRate: 8,
    repeat: -1
  });

  this.anims.create({
    key: 'walk_up',
    frames: this.anims.generateFrameNumbers('main_player', { start: 13, end: 16 }),
    frameRate: 8,
    repeat: -1
  });

  // Animaciones en idle (un solo frame)
  this.anims.create({ key: 'idle', frames: [{ key: 'main_player', frame: 0 }] });
}

function update() {
  const speed = 120;
  let moving = false;

  player.setVelocity(0);

  if (cursors.left.isDown) {
    player.setVelocityX(-speed);
    player.anims.play('walk_left', true);
    player.direction = 'left';
    moving = true;
  } else if (cursors.right.isDown) {
    player.setVelocityX(speed);
    player.anims.play('walk_right', true);
    player.direction = 'right';
    moving = true;
  } else if (cursors.down.isDown) {
    player.setVelocityY(speed);
    player.anims.play('walk_down', true);
    player.direction = 'down';
    moving = true;
  } else if (cursors.up.isDown) {
    player.setVelocityY(-speed);
    player.anims.play('walk_up', true);
    player.direction = 'up';
    moving = true;
  }

  if (!moving) {
    player.anims.play('idle', true);
  }
}
