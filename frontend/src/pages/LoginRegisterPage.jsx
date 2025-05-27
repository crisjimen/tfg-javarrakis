import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './auth.css'
import { AnimatePresence, motion as Motion } from 'framer-motion';

const LoginRegisterPage = () => { 
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const view = searchParams.get('view') || 'login';
  const isLogin = view === 'login';

  return (
    <div className={`wrapper ${isLogin ? 'bg-stars' : 'bg-clouds'}`}>
      
      <AnimatePresence mode="wait">
        <Motion.div
          key={isLogin ? 'stars' : 'clouds'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`bg-layer absolute inset-0 z-0 ${isLogin ? 'stars' : 'clouds'}`}
        />
      </AnimatePresence>


      {/* <div className={`bg-layer ${isLogin ? 'stars' : 'clouds'}`}>
      </div> */}

      {/* Iconos */}
      <div className="absolute top-4 right-6 flex gap-4 z-50">
        <Icon icon="pixel:home-solid"
        className={`${isLogin ? 'text-dusk-800' : 'text-spice-800'} 
        text-xl cursor-pointer
        hover:scale-110 transition-all`}
        onClick={() => navigate('/')}/>

        <Icon icon="pixel:github"
        className={`${isLogin ? 'text-dusk-800' : 'text-spice-800'} 
        text-xl cursor-pointer
        hover:scale-110 transition-all`}
        onClick={() => window.open('https://github.com/crisjimen')}/>
      </div>

        <div className="content flex flex-col items-center">

          <img src="src/assets/img/JavarrakisTypo.png" 
          alt="Logo" 
          className='mt-6'/>

          <AnimatePresence mode="wait">

            <Motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {isLogin ? <LoginForm /> : <RegisterForm />}
              
              </Motion.div>

          </AnimatePresence>

         <div className="absolute text-center text-amber-50 font-montserrat 
         bottom-3 cursor-default text-xs">
          <p>&copy; Javarrakis 2025 | Privacy Policy</p>
          <p className='font-semibold'>Code must flow</p>
         </div>
          
        </div>
    </div>
  )
}

export default LoginRegisterPage