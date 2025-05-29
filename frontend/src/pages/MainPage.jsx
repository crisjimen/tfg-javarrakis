import UserDetails from "@/components/main/UserDetails"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import './auth.css'
import { motion as Motion, AnimatePresence } from "framer-motion"
import LevelSelector from "@/components/LevelSelector"

const MainPage = () => {

  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, [])

  return (
    <div className="flex flex-col bg-clouds h-screen font-montserrat">

      <div
      className="flex align-center justify-between items-center p-4
      ">
        <Button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 cursor-pointer px-4 py-5
        bg-sand-100/50 font-montserrat text-spice-900
        hover:scale-105 text-xs hover:bg-transparent hover:backdrop-blur-lg
        border-1 border-sand-100/70 hover:border-sand-100">
          Hola, <b>{user?.username}</b>
        </Button>

        <div>
          <img src="src/assets/img/JavarrakisTypo.png" 
          alt="Logo"
          className="cursor-pointer hover:scale-105 transition-all"/>
        </div>

        <div className="flex gap-4 items-center mr-4 pixel-text
        text-xs">
          <p>{user?.reputationName}</p> - 
          <p>{user?.points}</p>
        </div>

      </div>
      

      <AnimatePresence>
        {showModal && (
          <Motion.div
            className="fixed inset-0 z-50 flex items-center justify-center
            bg-white/10 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <UserDetails user={user} onClose={() => setShowModal(false)} />
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      <LevelSelector />
      
    </div>
  )
}

export default MainPage