import React from 'react'
import { Icon } from '@iconify/react'

const Personal = ({user}) => {
    return (

    <div className='flex flex-col gap-4 font-montserrat items-center
    justify-center'>
        <h2 className='pixel-text text-spice-900'>
            Datos de la cuenta
        </h2>

        <div className="pixel-border flex items-center align-middle flex-col w-[80%] py-3
        bg-sand-100/50 text-spice-500 sm:w-full">

            <Icon icon="pixel:trophy-solid" className="text-2xl text-spice-900" />
            <p className="pixel-text text-[10px] text-center">
                Nivel de reputación
            </p>
            <p className='text-xs text-black'>{user?.reputationName}</p>

        </div>

        <div className="pixel-border flex items-center align-middle flex-col w-[80%] sm:w-full py-3
        bg-sand-100/50 text-spice-500">

            <Icon icon="pixel:star-solid" className="text-2xl  text-spice-900" />
            <p className="pixel-text text-[10px]">
                Puntos
            </p>
            <p className='text-xs text-black'>{user?.points}</p>

        </div>

        <div className="pixel-border flex items-center align-middle flex-col w-[80%] sm:w-full py-3
        bg-sand-100/50 text-spice-500">

            <Icon icon="pixel:envelope-solid" className="text-2xl  text-spice-900" />
            <p className="pixel-text text-[10px]"
            title={user?.email}>
                Email
            </p>
            <p className='text-xs text-black
            max-w-[80%] truncate'>{user?.email}</p>

        </div>


    </div>

    
  )
}

export default Personal