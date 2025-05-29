import {useEffect, useRef} from 'react'
import Phaser from 'phaser'
import LevelSelectScene from '@/phaser/LevelSelectScene'

const LevelSelector = () => {

    const gameRef = useRef(null);
    const phaserInstance = useRef(null);

    useEffect(() => {
        if (!gameRef.current || phaserInstance.current) return;

        const config = {
            type: Phaser.AUTO,
            width: '100%',
            height: 500,
            scene: [LevelSelectScene],
            parent: gameRef.current,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            backgroundColor: '#ffffff',
        };

        phaserInstance.current = new Phaser.Game(config);

        return() => {
            if(phaserInstance.current){
                phaserInstance.current.destroy(true);
                phaserInstance.current = null;
            }
        };
    }, []);

  return (
    <div
    ref={gameRef}
    id='phaser-level-selector'
    style={{
        width: '90%',
        height: '500px',
        margin: '30px auto 0 auto',
        border: '4px solid pink',
        borderRadius: '12px',
        overflow: 'hidden',
        imageRendering: 'pixelated'
        }} />
  )
}

export default LevelSelector