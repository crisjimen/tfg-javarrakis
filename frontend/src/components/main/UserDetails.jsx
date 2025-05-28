import {useState} from 'react'
import { Icon } from '@iconify/react';
import Personal from './tabs/Personal';
import Settings from './tabs/Settings';

const UserDetails = ({user, onClose}) => {

    const [activeTab, setActiveTab] = useState('personal');
    if(!user) return <div>Loading...</div>

    {/* Se evalúa en qué pestaña se encuentra */}
    const renderTabContent = () => {
        switch (activeTab) {
            case 'personal':
                return <Personal user={user} />;
            case 'settings':
                return <Settings />;
            default:
                return null;
        }
    }

    return (

    <div className="flex flex-col md:flex-row bg-spice-200/40
    border-5 border-sand-100 p-4 w-[90%] max-w-5xl mx-auto 
    shadow-sm mt-[5%] relative shadow-[#662d20]">
      
      {/* Panel Izquierdo - Estático */}
    <button className=" text-spice-900 absolute cursor-pointer
    top-4 right-4 w-fit
    hover:scale-110 hover:text-red-900 transition-all">
        <Icon icon="pixel:times-circle" 
        className="text-3xl" 
        onClick={onClose}/>
    </button>

    {/* Pestañas */}
    <div className="absolute flex z-0
    top-[-46px] left-1/3 -translate-x-1/2
    md:top-auto md:bottom-[-5px] md:right-[-65px] 
    md:left-auto md:flex-col md:translate-x-0">

        <button onClick={() => setActiveTab('personal')}
        className={`cursor-pointer  py-2 px-5
        border-5 border-sand-100 sm:border-r-0 md:border-r-5
        md:border-l-0
        
        ${activeTab === 'personal' ? 'bg-sand-100' : 'bg-spice-200/40'}`}>
            <Icon icon="pixel:user-solid" 
            className="text-xl text-spice-900" />
        </button>

        <button onClick={() => setActiveTab('settings')}
        className={`cursor-pointer py-2 px-5
        border-5 border-sand-100 md:border-t-0 md:border-l-0

        ${activeTab === 'settings' ? 'bg-sand-100' : 'bg-spice-200/40'}`}>
            <Icon icon="pixel:cog-solid" 
            className="text-xl text-spice-900" />
        </button>
    </div>

      <div className="md:w-1/3 flex flex-col items-center 
      border-b-2 pr-8
      md:border-b-0 md:border-r-3 border-[#c43e24] p-4">

        <h2 className='pixel-text text-sm text-center mb-3
        text-dusk-900'>
            Datos del guerrero
        </h2>

        <div className="mb-2 w-35 h-35 flex items-center 
        justify-center">
          <img src="src/assets/img/Avatar.png" alt="Avatar"
          className='rounded-lg' />
        </div>

        <p className="text-xs sm:text-sm md:text-base font-bold
         w-full max-w-[200px] truncate text-dusk-900">{user.username}</p>
        <p title={user.id} 
        className="text-sm text-sand-300 mb-4 
        max-w-[100px] truncate cursor-default">
            UID: {user.id}
        </p>
        
      </div>

      {/* Panel Derecho - Dinámico */}
      <div className="w-5/6 min-h-[90%] p-4 md:min-w-[550px] 
      md:min-h-[370px] ml-3">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default UserDetails