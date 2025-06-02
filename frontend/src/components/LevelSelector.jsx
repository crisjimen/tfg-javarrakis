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
            height: 520,
            scene: [LevelSelectScene],
            parent: gameRef.current,
            pixelart: true,
            antialias: false,
            backgroundColor: '#ffffff',
            dom: {
                createContainer: true
            }
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
        width: '80%',
        margin: '25px auto 0 auto',
        overflow: 'hidden',
        imageRendering: 'pixelated'
        }} 
    className='border-sand-200 pixel-border border-3'/>
  )
}

export default LevelSelector