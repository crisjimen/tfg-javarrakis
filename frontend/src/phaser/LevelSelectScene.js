import Phaser from "phaser";
import levelsData from '../assets/data/levels.json';
import { Icon } from "@iconify/react";

/**
 * Escena que muestra los niveles disponibles en el mapa
 */
export default class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super("LevelSelect");
    }

    preload() {
        this.load.image('background', '/level/background.png');
        this.load.image('levelNode', '/level/node.png');
        this.load.spritesheet('player', '/level/main_player.png', {
            frameWidth: 52,
            frameHeight: 100
        });
        this.load.image('star-bg', '/level/bg-star.png');

        this.load.image('glow', '/level/glow.png');
        this.load.image('pixel--star-solid.png', '/level/pixel--star-solid.png');
        this.load.image('pixel--star.png', '/level/pixel--star.png');
    }

    create() {

        const { width, height } = this.sys.game.canvas;

        // Fondo
        const bg = this.add.image(0, this.scale.height, 'background')
            .setOrigin(0,1);

        const scaleX = this.scale.width / bg.width;
        const scaleY = this.scale.height / bg.height;
        const scale = Math.max(scaleX, scaleY);
        
        bg.setScale(scale);

        // Añadir brillos al fondo

        for(let i = 0; i < 5; i++){

            const xGlow = Phaser.Math.Between(0, width);
            const yGlow = Phaser.Math.Between(0, height / 3.1);

            const scale = Phaser.Math.FloatBetween(0.1, 0.5);

            const starBg = this.add.image(xGlow, yGlow, 'star-bg')
                .setScale(scale)
                .setAlpha(Phaser.Math.FloatBetween(0.2, 0.5))
                .setDepth(0);
            
             this.tweens.add({
                targets: starBg,
                yoyo: true,
                alpha: {from: 0.2, to: 0.8},
                duration: Phaser.Math.Between(1000, 2000),
                repeat: -1,
                ease: 'Sine.easeInOut',
                delay: Phaser.Math.Between(0, 1500)
            });
        }

       

        this.textures.get('background').setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.textures.get('levelNode').setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.textures.get('player').setFilter(Phaser.Textures.FilterMode.NEAREST);

        // Animaciones del jugador
        this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'walkLeft',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 6,
            repeat: -1
        });

        const spacing = 250;
        const startX = (width - (levelsData.length - 1) * spacing) / 2;
        const yPos = height / 1.4;

        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xffb152, 1);

        // Usuario (si existe en contexto global)
        const storedUser = localStorage.getItem('user');
        const username = storedUser ? JSON.parse(storedUser).username : 'Jugador';

        // Crear nodos
        this.levelNodes = levelsData.map((level, i) => {
            const x = startX + i * spacing;

            const node = this.add.image(x, yPos, "levelNode")
                .setInteractive()
                .setScale(0.1);

            // Mostrar 3 estrellas, rellenando según dificultad
            const dificultad = level.dificultad || 1;
            const stars = Array.from({length: 3}, (_,i) => {
                const src = i < dificultad ? 'pixel--star-solid' : 'pixel--star';
                return `<img src = "/level/${src}.png" class="w-4 h-4" />`;
            }).join('');

            // Botón de comenzar
            // Crear el botón HTML con clases para estilo y funcionalidad
            const startButtonDom = this.add.dom(x, yPos + 82).createFromHTML(`
            <button
                class="pixel-text text-white px-4
                bg-gradient-to-b from-spice-600 to-orange-800
                py-2 rounded-sm cursor-pointer border-2 border-spice-200
                hover:scale-105 active:scale-95 button-shadow
                transition-all duration-200 active:translate-y-0.5"
                style="font-size: 14px;"
                id="start-button"
            >
                Comenzar
            </button>
            `);

            // Glow detras de la card
            const glow = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 160, 'glow')
                .setOrigin(0.5).setDepth(0);
            glow.setAlpha(0.2);

            this.tweens.add({
                targets: glow,
                alpha: { from: 0.4, to: 0.7 },
                scale: { from: 1, to: 1.1 },
                duration: 1000,
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1
            })

            // Card del nivel con la información detallada
            const card = this.add.dom(this.cameras.main.centerX, this.cameras.main.centerY - 165)
            .createFromHTML(`
                <div
                    class="text-center pixel-text text-spice-600
                    flex flex-col gap-1 border-orange-900/70 border-2
                    bg-[rgb(48,27,36)]/60 px-12 py-3">
                    <h3 class="text-sm text-spice-300">
                        ${level.id} - 1
                    </h3>

                    <h2 class="drop-shadow-[2px_2px_0px_black] font-semibold text-lg">
                    ${level.nombre}
                    </h2>

                    <p class="flex justify-center gap-1 drop-shadow-[1px_1px_0px_black]">
                        ${stars}
                    </p>

                    <p class="text-sm text-spice-400 drop-shadow-[2px_2px_0px_sienna]">
                    ${level.objetivo}
                    </p>
                </div>
                `);

            // Inicialmente oculto (igual que en tu código)
            startButtonDom.setVisible(false).setAlpha(0).setDepth(2);

            // Acceder al botón HTML dentro del DOM element para añadir listener
            const startButton = startButtonDom.getChildByID('start-button');

            startButton.addEventListener('click', () => {
            window.location.href = `/level?id=${level.id}`;
            });

            return { ...level, x, y: yPos, node, card, difficultyStars: stars, startButton: startButtonDom };
        });

        // Conectar los nodos con puntitos
        for (let i = 0; i < this.levelNodes.length - 1; i++) {
            const start = this.levelNodes[i];
            const end = this.levelNodes[i + 1];

            const pointsBetween = 10;
            for (let j = 1; j < pointsBetween; j++) {
                const t = j / pointsBetween;
                const x = Phaser.Math.Linear(start.x, end.x, t);
                const y = Phaser.Math.Linear(start.y, end.y, t);
                this.graphics.fillCircle(x, y, 3); 
            }
        }

        //Ocultar todas las cards
        this.hideAllCards();

        // Crear jugador

        this.selectedIndex = 0;
        const firstNode = this.levelNodes[this.selectedIndex];

        this.player = this.add.sprite(firstNode.x, firstNode.y - 68, 'player', 0)
            .setScale(1.3)
            .setDepth(1);
        
            //Animacion de bounce del jugador
        this.playerY = this.player.y;
        this.playerBounce = this.tweens.add({
            targets: this.player,
            y: this.playerY - 1.5,
            duration: 600,
            ease: 'steps',
            yoyo: true,
            repeat: -1
        })

        // Función para truncar texto con puntos suspensivos
        function truncateText(scene, text, fontSize, maxWidth, fontFamily) {
            const tempText = scene.add.text(0, 0, '', {
                fontFamily: fontFamily,
                fontSize: fontSize
            }).setVisible(false);

            let truncated = text;
            while (truncated.length > 0 && tempText.setText(truncated + '...').width > maxWidth) {
                truncated = truncated.slice(0, -1);
            }

            tempText.destroy();
            return truncated.length < text.length ? truncated + '...' : text;
        }

        // Obtener username
        const rawUsername = username || 'Jugador';

        // Truncar si hace falta
        const displayUsername = truncateText(this, rawUsername, 18, 100, 'Consolas');

        // Crear texto del usuario
        this.userText = this.add.text(this.player.x, this.player.y - 85, displayUsername, {
            fontFamily: 'Consolas',
            fontSize: 16,
            color: "#ffffff",
            backgroundColor: "#000000aa",
            padding: { x: 5, y: 4 },
            resolution: 2  // Hace que se vea más nítido
        }).setOrigin(0.5).setDepth(3);

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.isMoving = false;

        // Mostrar inicialmente
        this.showNodeDetails(this.selectedIndex);
    }

    update() {

        if (this.playerBounce){
            if (this.isMoving) {
            this.playerBounce.pause();
            } else {
                this.playerBounce.resume();
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.moveToIndex(this.selectedIndex - 1);
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.moveToIndex(this.selectedIndex + 1);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            const level = this.levelNodes[this.selectedIndex];
            window.location.href = `/level?id=${level.id}`;
        }
    }

    moveToIndex(index) {
        if (index < 0 || index >= this.levelNodes.length) return;
        this.playerBounce.pause();

        const current = this.levelNodes[this.selectedIndex];
        const target = this.levelNodes[index];
        const direction = target.x > current.x ? 'walkRight' : 'walkLeft';

        this.player.anims.play(direction, true);
        this.isMoving = true;
        this.selectedIndex = index;

        this.hideAllCards();

        this.tweens.add({
            targets: [this.player, this.userText],
            x: target.x,
            duration: 600,
            ease: "Power2",
            onComplete: () => {
                this.player.anims.stop();
                this.player.setFrame(0);
                this.playerBounce.resume();
                this.playerY = target.y - 68;
                this.player.y = this.playerY;
                this.isMoving = false;
                this.showNodeDetails(index);
            },
        });
    }

    hideAllCards() {
        this.levelNodes.forEach(node => {
            node.card.setVisible(false);
            node.startButton.setVisible(false).setAlpha(0);
        });
    }

    showNodeDetails(index) {
        const node = this.levelNodes[index];
        node.card.setVisible(true);
        node.startButton.setVisible(true).setAlpha(1);
        this.userText.setX(node.x);
    }
}
