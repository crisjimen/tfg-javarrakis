import Phaser from "phaser";
import levelsData from '../assets/data/levels.json';


/* Escena que muestra los niveles disponibles y desde la que se accede 
a cada uno de ellos. Esta clase usa Phaser.js para la creación de la 
escena y estética del juego. */

export default class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super("LevelSelect");
    }

    //Se cargan los niveles
    preload() {

        //Carga de fondo y los sprites
        this.load.image('background', '/level/background.png');
        this.load.image('levelNode', '/level/node.png');
        this.load.spritesheet('player', '/level/main_player.png',
             { frameWidth: 52, frameHeight: 102 });
    }

    create() {
        //Escalado automático del tamaño del contenedor
        const {width, height} = this.sys.game.canvas;

        //Fondo
        this.add.image(0, 0, 'background')
        .setOrigin(0)
        .setDisplaySize(width, height);

        //Jugador y animaciones
        this.anims.create({
            key:'walkRight',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key:'walkLeft',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 6,
            repeat: -1
        });

        //Cargar nodos y centrarlos horizontalmente
        const spacing = 250;
        const startX = (width - (levelsData.length -1) * spacing) / 2;
        const yPos = height / 1.4;

        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xffb152, 1);   

        //Nodos
        this.levelNodes = levelsData.map((level, i) => {
            
            const x = startX + i * spacing;
            const node = this.add
                .image(x, yPos, "levelNode")
                .setInteractive()
                .setScale(0.1);

            // Tarjeta de información
            const card = this.add
                .text(x, yPos + 50, level.nombre, {
                class: "pixel-text",
                backgroundColor: "#333",
                color: "#fff",
                padding: { x: 16, y: 10 },
                resolution: 2
                })
                .setOrigin(0.5)
                .setVisible(false);

                return { ...level, x, y: yPos, node, card };
        });

        /// Creación de los puntos que conectan los diferentes nodos
        for (let i = 0; i < this.levelNodes.length - 1; i++) {
            const start = this.levelNodes[i];
            const end = this.levelNodes[i + 1];

            const pointsBetween = 10; // Número de puntitos entre nodos
            for (let j = 1; j < pointsBetween; j++) {
                const t = j / pointsBetween;
                const x = Phaser.Math.Linear(start.x, end.x, t);
                const y = Phaser.Math.Linear(start.y, end.y, t);

                this.graphics.fillCircle(x, y, 3); // Radio 3 px
            }
        }

        //Jugador
        this.selectedIndex = 0;
        const firstNode = this.levelNodes[this.selectedIndex];
        this.player = this.add
        .sprite(firstNode.x, firstNode.y -68, 'player',0)
        .setScale(1.3)
        .setDepth(1);
    

        //Flechas de movimiento
        this.cursors = this.input.keyboard.createCursorKeys();
        this.isMoving = false;
        this.levelNodes[this.selectedIndex].card.setVisible(true);
    }
    
    update() {

        if (this.isMoving) return;

        if(Phaser.Input.Keyboard.JustDown(this.cursors.left)){
            this.moveToIndex(this.selectedIndex - 1);
        } else if(Phaser.Input.Keyboard.JustDown(this.cursors.right)){
            this.moveToIndex(this.selectedIndex + 1);
        } 

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            const level = this.levelNodes[this.selectedIndex];
            window.location.href = `/level?id=${level.id}`;
        }
    }

    moveToIndex(index) {
        if (index < 0 || index >= this.levelNodes.length) return;
        
        const current = this.levelNodes[this.selectedIndex];
        const target = this.levelNodes[index];

        const direction = target.x > current.x ? "walkRight" : "walkLeft";
        this.player.anims.play(direction, true);

        this.isMoving = true;
        this.selectedIndex = index;

        // Oculta todos los cards
        this.levelNodes.forEach(node => node.card.setVisible(false));

        this.tweens.add({
        targets: this.player,
        x: target.x,
        duration: 600,
        ease: "Power2",
        onComplete: () => {
            this.isMoving = false;
            this.player.anims.stop();
            this.player.setFrame(0);
            target.card.setVisible(true); // Parado
        },
        });
    }
}
    