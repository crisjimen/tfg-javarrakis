import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './auth.css'

const LoginRegisterPage = () => {

  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className={`wrapper ${isLogin ? 'bg-stars' : 'bg-clouds'}`}>
      <div className={`bg-layer ${isLogin ? 'stars' : 'clouds'}`}>

        <div className="content">

          <img src="src/assets/img/JavarrakisTypo.png" 
          alt="Logo" 
          className='justify-self-center mt-6'/>

          <SwitchTransition mode="out-in">
            <CSSTransition
              key={location.pathname}
              classNames="fade-slide"
              timeout={500}
            >
              <div>
                {isLogin ? <LoginForm /> : <RegisterForm />}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </div>
  )
}

export default LoginRegisterPage