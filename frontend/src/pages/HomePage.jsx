import {useState} from "react"; 
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

/**
 * Página principal de bienvenida
 * Landing page
 * 
 */

export default function HomePage() {

  //Variables para controlar el header dependiendo del dispositivo
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white flex flex-col main-scroll">
      
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-[#312028]/95
      sticky top-0 z-50">
        
        <div className="font-bold tracking-widest">
          <img src="src/assets/img/JavarrakisTypo.png" alt="Logo"
          className="cursor-pointer hover:scale-105 transition-all
          w-[200px] md:w-[230px]" 
          onClick={() => {
            const element = document.getElementById('hero');
            element.scrollIntoView({ behavior: 'smooth' });
          }} />
        </div>

        {/* Menu hamburguesa */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white/80 cursor-pointer
          hover:scale-105 transition-all hover:text-white"
          aria-label="Abrir menú">

          {menuOpen ? <Menu size={28} className="hidden"/> 
          : <Menu size={28}/>}
        </button>  

        {/* Navegación dispositivos grandes*/}
        <nav className="hidden md:flex space-x-6 text-sm font-montserrat
        md:items-center md:gap-3">
          <a href="#about" className="hover:underline
          text-lg text-spice-300">
          Sobre Javarrakis</a>

        <a href="#features" className="hover:underline
        text-lg text-spice-300">
          Características</a>

        <a href="#statistics" className="hover:underline
        text-lg text-spice-300">
          Estadísticas</a>

          <a href="#opinions" className="hover:underline
          text-lg text-spice-300">
          Opiniones</a>

          <a href="#footer" className="hover:underline
          text-lg text-spice-300">
          Contacto</a>

          <div className="flex gap-5 ml-5">

          <a 
            className="hover:scale-105 bg-dusk-900/90 py-2 pixel-text text-center
            text-[12px] border-2 border-dusk-800 drop-shadow-[3px_3px_0px_#261513]
            transition-all cursor-pointer px-8" 
            onClick={() => {
              setMenuOpen(false);
              navigate('/auth?view=login');
            }}>Entrar</a>

            <a 
              className="hover:scale-105 bg-spice-900/90 pixel-text text-sm
              py-2 text-[12px] transition-all cursor-pointer px-2 border-2 text-center
              border-spice-800
              drop-shadow-[3px_3px_0px_#261513]" 
              onClick={() => {
                setMenuOpen(false);
                navigate('/auth?view=register');
              }}>Registrarse</a>

          </div>
          
        </nav>

        {/* Navegación dispositivos pequeños */}
        {menuOpen && (
            <nav className={`absolute top-0 right-0 w-[65%] h-screen text-white
             bg-[#312028]/95 backdrop-blur-sm flex flex-col items-center py-4 
             md:hidden justify-between z-40 transition-transform duration-300
             ease-in-out
             ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

              <div className="flex flex-col gap-4 items-start mt-7 w-full ml-25">
                {menuOpen && (
                  <X size={28} onClick={() => setMenuOpen(false)}
                  className="cursor-pointer hover:scale-105 transition-all
                  text-white/80 hover:text-white"/>
                )}

                
              <a href="#about" className="hover:underline
              font-montserrat" 
              onClick={() =>  setMenuOpen(false) }>
                Sobre Javarrakis</a>
              
              
              <a href="#features" className="hover:underline
              font-montserrat" 
              onClick={() => setMenuOpen(false)}>Características</a>

              <a href="#statistics" className="hover:underline
              font-montserrat" 
              onClick={() => setMenuOpen(false)}>Estadísticas</a>

              <a href="#opinions" className="hover:underline
              font-montserrat" 
              onClick={() => setMenuOpen(false)}>Opiniones</a>


              <a href="#footer" className="hover:underline
              font-montserrat" 
              onClick={() => setMenuOpen(false)}>Contact</a>

              </div>

              <div className="flex-col grap-4 flex">

                <div className="w-full flex flex-col gap-2.5 mb-6">
                  <a 
                  className="hover:scale-105 bg-dusk-900/90 py-2 pixel-text text-center
                  text-sm border-2 border-dusk-800 drop-shadow-[3px_3px_0px_#261513]
                  transition-all cursor-pointer px-20" 
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/auth?view=login');
                  }}>Entrar</a>

                  <a 
                  className="hover:scale-105 bg-spice-900/90 pixel-text text-sm
                  py-2 transition-all cursor-pointer px-2 border-2 text-center
                  border-spice-800
                  drop-shadow-[3px_3px_0px_#261513]" 
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/auth?view=login');
                  }}>Registrarse</a>
                </div>

                <div className="flex gap-3.5 justify-center mb-3">
                  <Icon icon="pixel:facebook-round" 
                  className="text-3xl cursor-pointer hover:scale-105 transition-all
                  text-white/50 hover:text-white" />
                
                  <Icon icon="pixel:github" 
                  className="text-3xl cursor-pointer hover:scale-105 transition-all
                  text-white/50 hover:text-white" />

                  <Icon icon="pixel:instagram" 
                  className="text-3xl cursor-pointer hover:scale-105 transition-all
                  text-white/50 hover:text-white" />
                </div>

              </div> 
            </nav>
        )}
      </header>

      {/* Hero principal */}
      <main className="flex flex-col items-center text-center w-full
      self-center h-[88vh] justify-center bg-[url('./src/assets/img/level-bg.png')] bg-cover bg-center"
      id="hero">
        <motion.h2
          className="text-4xl md:text-5xl font-bold drop-shadow-[0_5px_5px_black] pixel-text
          md:max-w-4xl max-w-3xl px-5 md:px-0"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Aprende Java en el universo de Dune
        </motion.h2>
        <motion.p
          className="mt-6 text-lg md:text-xl text-zinc-200 drop-shadow-md
          font-montserrat px-5 md:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Una aventura en pixel art donde la programación es tu mayor arma.
        </motion.p>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Button
            className="text-lg px-8 py-5.5 drop-shadow-[4px_4px_0px_#26151a]
            rounded-none
            bg-spice-600/90 hover:bg-spice-600 cursor-pointer hover:scale-105
            border-3 border-spice-700
            transition-all pixel-text"
            onClick={() => navigate("/auth")}
          >
            Comenzar aventura
          </Button>
        </motion.div>
        
        <Icon icon="pixel:angle-down" 
          className="text-5xl text-spice-100 mt-10
          drop-shadow-[3px_3px_0px_#261513] cursor-pointer hover:scale-105 
          transition-all animate-float" 
          onClick={() => {
            const element = document.getElementById('about');
            element.scrollIntoView({ behavior: 'smooth' });
          }}
          />

      </main>

      {/* Sobre el juego */}
      <section id="about" className="py-20 px-6 bg-[#1e1e1e]">

        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-2xl pixel-text 
          font-bold mb-5 text-spice-500">
            Sobre Javarrakis
            </h3>

          <p className="text-zinc-200 text-lg leading-relaxed
          font-montserrat">
            Javarrakis es una experiencia educativa gamificada donde el jugador explora un mundo inspirado en la obra de Frank Herbert mientras aprende programación Java. Cada nivel representa un reto lógico y narrativo, progresando a través de mecánicas claras y feedback continuo.
          </p>
        </motion.div>
      </section>

      {/* Sección: Características */}
      <section id="features" 
      className="py-22 px-6 bg-spice-300/40 text-center
      border-t-4 border-spice-700">
        <motion.h3
          className="text-2xl font-bold mb-9 text-spice-700
          pixel-text "
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          ¿Qué encontrarás?
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl 
        mx-auto">
          {[
            {
              title: "Desafíos interactivos",
              desc: "Pon a prueba tus habilidades resolviendo retos de programación en Java. Cada ejercicio está diseñado para enseñarte conceptos de forma práctica, con feedback instantáneo.",
              icon: "streamline-pixel:coding-apps-websites-programming-browser"
            },
            {
              title: "Estilo retro",
              desc: "Sumérgete en un universo visual único inspirado en Dune, con gráficos pixel art cuidadosamente diseñados que evocan la estética de los videojuegos clásicos.",
              icon: "streamline-pixel:entertainment-events-hobbies-game-machines-arcade-1"
            },
            {
              title: "Aprendizaje guiado",
              desc: "Nuestro sistema inteligente evalúa tu código, detecta errores y te ofrece recomendaciones. Aprende de tus fallos, avanza a tu ritmo y mejora tu lógica y estilo de programación.",
              icon: "streamline-pixel:content-files-books-2"
            }
          ]
          .map((item, index) => (

            <motion.div
              key={index}
              className="bg-spice-300 p-6 border-3 
              border-spice-700 drop-shadow-[4px_4px_0px_maroon]
              hover:scale-105 transition-all"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex justify-left gap-4 items-center mb-3">
                <Icon icon={item.icon} className="text-4xl text-spice-900" />
                <h4 className="text-[18px] font-normal pixel-text text-left
                text-spice-900">
                  {item.title}
                  </h4>
              </div>
              
              <p className="text-zinc-50 text-sm text-left 
              font-normal 
              font-montserrat">
                {item.desc}
                </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sección: Estadísticas */}
      <section className="py-20 px-6 bg-[#26151a] text-center
      flex flex-col justify-center items-center align-middle
      border-t-4 border-b-4 border-t-spice-900 border-b-dusk-800" 
      id="statistics">

        <motion.h3
          className="text-2xl pixel-text font-semibold mb-6
           text-spice-400"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Estadísticas
        </motion.h3>


        <div className="flex flex-col md:flex-row justify-center
        font-montserrat md:gap-20 items-center md:items-start">

          <div className="flex flex-col md:text-xl md:max-w-[42%] items-center
          md:items-start
          gap-4 md:mt-10">

            <p className="text-zinc-100 text-lg 
            md:text-left font-normal">
              Miles de jugadores ya han emprendido su aventura en <span className="text-spice-400 font-semibold">Javarrakis</span>. 
              Con cada línea de código, conquistan desafíos, mejoran sus habilidades y se acercan al dominio total de la programación en Java.
            </p>

            <button
            className="md:mt-3
            text-spice-900 font-normal pixel-text py-3 px-6 text-lg border-3
            hover:scale-105 transition-all ease-in-out hover:bg-spice-600 
            cursor-pointer">
              Ver más
            </button>
          </div>
          

        
          <div className="grid md:grid-cols-2 gap-6 mt-5 max-w-4xl">
            {[
              { stat: "+1000", label: "Jugadores activos" },
              { stat: "+150", label: "Retos completados" },
              { stat: "98%", label: "Satisfacción" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`bg-[#2a2a2a]/40 p-8 border-3 border-spice-700 
                  drop-shadow-[4px_4px_0px_maroon]
                  ${index === 2 ? 'md:col-span-2 md:mx-auto md:w-2/4 text-center' : ''}
                `}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-2xl font-bold text-spice-700 pixel-text">
                  {item.stat}
                </p>
                <p className="text-[15px] text-zinc-200">{item.label}</p>
              </motion.div>
            ))}
          </div>


        </div>
        
      </section>

      {/* Sección: Opiniones */}
      <section className="py-20 px-6 bg-dusk-900 text-center border-b-3 
      border-dusk-600"
      id="opinions">
        <motion.h3
          className="text-2xl font-bold mb-12 text-white-400
          pixel-text"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Voces del desierto
        </motion.h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            "Una experiencia única, me hizo amar la programación. La temática de Dune hace que el aprendizaje sea aún más emocionante",
            "El estilo visual y los retos me mantuvieron enganchado. Los ejercicios prácticos fueron clave para afianzar mis conocimientos",
          ].map((quote, index) => (

            <motion.blockquote
              key={index}
              className="bg-dusk-600 p-6 border-l-4
               border-dusk-500 drop-shadow-[3px_3px_0_#331f64]
                text-left text-zinc-200 italic"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              “{quote}”
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* Sección: Start Now */}
      <section className="py-20 px-6 bg-gradient-to-b from-indigo-950 to-orange-800 text-center">
        <motion.h3
          className="text-2xl font-bold mb-8 pixel-text
           text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          ¿Listo para empezar?

          <p className="text-[15px] font-montserrat max-w-[70%] 
          mx-auto mt-2 text-spice-100 font-normal">
            El código debe fluir. Únete a nuestra comunidad y comienza tu viaje para convertirte en
            un maestro de Java
          </p>

        </motion.h3>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >

          <Button
            className="text-lg px-8 py-6 shadow-xl rounded-none
             bg-spice-600 hover:bg-spice-700 cursor-pointer
             drop-shadow-[3px_3px_0_#331f64] pixel-text"

            onClick={() => navigate("/auth")}
          >
            Empezar ahora
          </Button>
        </motion.div>
      </section>

    

      {/* Footer */}
      <footer id="footer"
      className="w-full text-center py-8 bg-[#26151a] text-sm
      flex flex-col justify-center items-center
      border-t-2 border-[#1e1e1e] ">

          <div className="flex md:justify-between px-5 w-full
          flex-col md:flex-row gap-8 md:gap-0">

            <div className="flex flex-col">
              <img src="src/assets/img/JavarrakisTypo.png" alt="Logo Javarrakis" 
              className="w-50 cursor-pointer hover:scale-105 transition-all"/>

              <p className="text-xs text-white mt-2 whitespace-pre-line
              text-left">
                {`La comunidad de aprendizaje de Java.
                  Proyecto realizado para el TFG de Desarrollo de Aplicaciones Web del IES Azarquiel.
                  Realizado con fines educativos (y mucho amor). 
                  ٩(｡•́‿•̀｡)۶`}
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-end">
                <p className="pixel-text">
                  ENLACES</p>

                <div className="flex gap-1 flex-col items-start md:items-end
                md:gap-5 md:flex-row">
                  <a href="#about">Sobre nosotros</a>
                  <a href="#features">Características</a>
                  <a href="#statistics">Estadísticas</a>
                  <a href="#options">Opiniones</a>
                  <a href="#contact">Contacto</a>
                </div>
              </div>

              <div className="flex flex-col items-star md:items-end gap-2">
                <p className="pixel-text">
                  REDES SOCIALES
                </p>

                <div className="flex gap-4">
                  <Icon icon="pixel:facebook-round" className="text-2xl" />
                  <Icon icon="pixel:github" className="text-2xl" />
                  <Icon icon="pixel:instagram" className="text-2xl" />
                </div>
              </div>
            </div>

          </div>

          <div className="w-[95%] mt-4 pt-4 border-t-2 border-[#1e1e1e]">
            © 2025 Javarrakis | Code must flow. Cristina Jiménez
          </div>
        
      </footer>
    </div>
  );
}
