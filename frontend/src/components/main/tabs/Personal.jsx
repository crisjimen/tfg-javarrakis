import React from 'react'
import { Icon } from '@iconify/react'

const Personal = ({user}) => {
    return (

    <div className='flex flex-col gap-4 font-montserrat items-center
    sm:items-start'>
        <h2 className='pixel-text text-spice-900'>
            Datos de la cuenta
        </h2>

        <div className="pixel-border flex items-center align-middle flex-col w-[80%] sm:w-[50%] py-3
        bg-sand-100/50 text-spice-500">

            <Icon icon="pixel:trophy-solid" className="text-2xl" />
            <p className="pixel-text text-[10px] text-center">
                Nivel de reputación
            </p>
            <p className='text-xs text-black'>{user?.reputationName}</p>

        </div>

        <div className="pixel-border flex items-center align-middle flex-col w-[80%] sm:w-[50%] py-3
        bg-sand-100/50 text-spice-500">

            <Icon icon="pixel:star-solid" className="text-2xl" />
            <p className="pixel-text text-[10px]">
                Puntos
            </p>
            <p className='text-xs text-black'>{user?.points}</p>

        </div>

        <div className="pixel-border flex items-center align-middle flex-col w-[80%] sm:w-[50%] py-3
        bg-sand-100/50 text-spice-500">

            <Icon icon="pixel:envelope-solid" className="text-2xl" />
            <p className="pixel-text text-[10px]">
                Email
            </p>
            <p className='text-xs text-black'>{user?.email}</p>

        </div>


    </div>

    
  )
}

export default Personal