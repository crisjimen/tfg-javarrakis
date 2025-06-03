import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import api from "@/services/api"
import { useAuth } from "@/context/AuthContext"
import { Icon } from "@iconify/react"

const LevelPage = () => {
  const [level, setLevel] = useState(null)
  const [error, setError] = useState(null)
  const [code, setCode] = useState("")
  const navigate = useNavigate();

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [execError, setExecError] = useState(null);

  const { refreshUser } = useAuth();

  const query = new URLSearchParams(useLocation().search)
  const levelId = query.get("id")

  const lineNumbersRef = useRef(null)
  const textareaRef = useRef(null)
  const scrollContainerRef = useRef(null) ;// Contenedor con scroll

  //Dividir el mensaje de error
  const partes = execError?.split("💡")
  const errorMsg = partes?.[0]?.trim()
  const recomendacion = partes?.[1]?.trim();

  useEffect(() => {
    setOutput("")
    setExecError(null)
  }, [levelId])

  useEffect(() => {
    fetch("/src/assets/data/levels.json")
      .then((res) => {
        if (!res.ok) throw Error("No se pudo obtener el nivel")
        return res.json()
      })
      .then((levels) => {
        const level = levels.find((level) => level.id === Number(levelId))
        if (!level) throw Error("No se pudo encontrar el nivel")
        setLevel(level)
        setCode(level.codigoInicial)
      })
      .catch((err) => setError(err.message))
  }, [levelId])

  // Ajustar la altura del textarea cuando cambia el código
  const adjustTextareaHeight = () => {
  if (textareaRef.current && lineNumbersRef.current) {
    textareaRef.current.style.height = "auto"
    const newHeight = textareaRef.current.scrollHeight
    textareaRef.current.style.height = newHeight + "px"
    lineNumbersRef.current.style.height = newHeight + "px"
  }
}

  useEffect(() => {
    adjustTextareaHeight()
  }, [code])

  // Ajustar altura también cuando se carga el nivel
  useEffect(() => {
    adjustTextareaHeight()
  }, [level])

  // Sincronizar scroll cuando se hace scroll en el contenedor padre
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    const textarea = textareaRef.current
    const linesDiv = lineNumbersRef.current

    if (!scrollContainer || !textarea || !linesDiv) return

    const onScroll = () => {
      const scrollTop = scrollContainer.scrollTop
      textarea.scrollTop = scrollTop
      linesDiv.scrollTop = scrollTop
    }

    scrollContainer.addEventListener("scroll", onScroll)
    return () => {
      scrollContainer.removeEventListener("scroll", onScroll)
    }
  }, [])

  if (error) return <div className="text-red-500">{error}</div>


  const handleCodeChange = (e) => {
    setCode(e.target.value)
  }

  //Realizar llamada a la API
  const ejecutarCodigo = async () => {
      setLoading(true)
      setExecError(null)
      setOutput("")

      try {
        const res = await api.post(`/level/${level.id}/submit`, {
          userCode: code,
          expectedOutput: level.salidaEsperada,
          points: level.points,
        });

        setOutput(res.data);
        await refreshUser();

      } catch (error) {
        
        setExecError(error.response?.data?.message);

      } finally{
        setLoading(false)
      }
    }


  return (
    <div
      className="w-full min-h-screen bg-[url('/src/assets/img/level-bg.png')] 
      text-white font-mono px-8 py-6 bg-cover bg-center"
    >
      {!level? <div>Cargando...</div> : 
      <>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8 mt-3">
        <button
          onClick={() => navigate('/')}
          className="px-3 py-2 bg-[#3b2f2f]/70 text-spice-200 border
           border-yellow-600 rounded hover:bg-spice-400/80 cursor-pointer
           hover:text-[#3b2f2f]
           pixel-text flex items-center gap-1 text-sm"
        >
          <Icon icon="pixel:angle-left" className="text-xl" />
          Volver
        </button>
        <h1
          className="text-2xl text-spice-500 text-center w-full ml-16 pixel-text
          drop-shadow-[4px_4px_0_#000]"
        >
          {level.nombre}
        </h1>
      </div>

      {/* Main layout */}
      <div className="flex justify-between relative gap-6">
        {/* Consola de código */}
        <div
          className="flex-1 bg-[#312028] border-2 border-spice-700 
          rounded shadow-md flex drop-shadow-[4px_4px_0_#312028]"
        >
          {/* Contenedor con scroll compartido */}
          <div
            ref={scrollContainerRef}
            className="flex w-full h-[450px] overflow-auto custom-scroll"
          >
            {/* Números de línea */}
            <div
              ref={lineNumbersRef}
              className="bg-[#26151a] text-gray-400/60 px-2 py-4 pr-3 
              text-right select-none min-w-[30px]"
              style={{ userSelect: "none", overflow: "hidden" }}
            >
              {code.split("\n").map((_, i) => (
                <div key={i} className="h-[1.5em] leading-[1.5em]">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              className="bg-transparent text-white py-4 px-2
              resize-none outline-none font-mono w-full leading-[1.5em]"
              style={{ overflow: "visible", height: "auto", minHeight: "100%" }}
              value={code}
              onChange={handleCodeChange}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault()
                  const start = e.target.selectionStart
                  const end = e.target.selectionEnd
                  const value = e.target.value
                  const newValue =
                    value.substring(0, start) + "\t" + value.substring(end)
                  setCode(newValue)

                  setTimeout(() => {
                    e.target.setSelectionRange(start + 1, start + 1)
                  }, 0)
                }

                if (e.key === "Enter") {
                  e.preventDefault()
                  const start = e.target.selectionStart
                  const end = e.target.selectionEnd
                  const value = e.target.value

                  const lineStart = value.lastIndexOf("\n", start - 1) + 1
                  const currentLine = value.substring(lineStart, start)
                  const indentMatch = currentLine.match(/^\s*/)
                  const indent = indentMatch ? indentMatch[0] : ""

                  const newValue =
                    value.substring(0, start) + "\n" + indent + value.substring(end)
                  setCode(newValue)

                  setTimeout(() => {
                    const cursor = start + 1 + indent.length
                    e.target.setSelectionRange(cursor, cursor)
                  }, 0)
                }
              }}
            />
          </div>

          {/* Botón de enviar */}
          <div className="flex mt-6 absolute bottom-3 right-3">
              <button
                className="px-6 py-2 bg-spice-600/80 hover:bg-spice-700/80 
                border-2 border-spice-700 pixel-text text-xs
                text-[#26151a] font-extrabold rounded
                cursor-pointer"
                onClick={ejecutarCodigo}
                disabled={loading}
              >
                {loading ? "Comprobando..." : "Ejecutar"}
              </button>

            </div>
          </div>

          {/* Panel lateral (objetivo + descripción + salida) */}
          <div className="w-[420px] flex-shrink-0 bg-[#312028]/80 border border-yellow-700 rounded p-4">
            <div className="mb-4">
              <h2 className=" pixel-text text-spice-300 mb-1
              flex items-center gap-4"
              >
              <Icon icon="pixel:trophy-solid" className="text-xl" />
              Objetivo
              </h2>
              
              <p>{level.objetivo}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-sm pixel-text text-spice-300 mb-1 flex 
              items-center gap-4">
                <Icon icon="pixel:code-solid" className="text-xl" /> 
                Descripción
              </h2>
              <p className="text-[15px] font-montserrat">
                {level.descripcionDetallada}</p>
            </div>

            <div>
              <h2 className="text-sm text-spice-300 mb-1 pixel-text
              flex items-center gap-4">
              <Icon icon="pixel:vote-yeah-solid" className="text-xl" />
              Salida esperada
              </h2>

              <pre className="bg-[#26151a] text-spice-100 p-2 
              rounded text-sm whitespace-pre-wrap font-mono">
                {level.salidaEsperada}
              </pre>
            </div>

            {execError && (
              <div className="text-red-400 whitespace-pre-wrap mt-4 text-start
              bg-[#26151a] p-2 rounded">
                {errorMsg}
                </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          {execError && (
              <div className="text-[#26151a] border-2 border-spice-500
              text-start mt-4 bg-spice-500/70 p-2 rounded flex items-center gap-4">

                <Icon icon="pixel:minds" className="text-2xl text-spice-900" />
                {recomendacion.split('\n').map((linea, index) => (

                  <p key={index} 
                  className={index === 0 ? "font-bold" : ""}
                  >{linea}</p>
                ))}
                </div>
            )}

            {output && (
            <div className="fixed inset-0 bg-black/80 flex items-center 
            justify-center z-50">
              <div className="bg-zinc-900 text-emerald-400 p-6 
              rounded-xl shadow-lg max-w-md w-full space-y-4 text-center 
              border-2 border-emerald-600 drop-shadow-[0_0_0.3rem_emerald]">

                <h2 className="text-lg font-bold pixel-text flex items-center gap-2
                justify-center">
                  <Icon icon="pixel:trophy-solid" className="text-2xl" /> 
                  ¡Nivel completado!
                  </h2>

                <div>
                  <strong className="block mb-1">
                    Puntos obtenidos:
                  </strong>

                  <pre className="bg-zinc-950/80 p-2 rounded text-sm border border-emerald-700">{output.puntuacion}</pre>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={() => navigate(`/level?id=${level.id + 1}`)} // reemplaza con tu función
                    className="bg-emerald-600 hover:bg-emerald-500
                    text-black font-bold py-2 px-4 rounded shadow
                    cursor-pointer flex items-center gap-2"
                  >
                    <Icon icon="pixel:plane-departure-solid" className="text-xl" />
                    Siguiente nivel
                  </button>
                  <button
                    onClick={() => navigate("/")} // reemplaza con tu función
                    className="bg-zinc-800 hover:bg-zinc-700 text-emerald-300 
                    border border-emerald-500 font-bold py-2 px-4 rounded shadow
                    cursor-pointer flex gap-2"
                  >
                    Volver al menú
                    <Icon icon="pixel:home-solid" className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </>
      }

      

    </div>
      
  )
}

export default LevelPage
