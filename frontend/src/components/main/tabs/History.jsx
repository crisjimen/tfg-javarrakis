import { useEffect, useState} from 'react'
import { useAuth } from '@/context/AuthContext'

/**
 *  Se obtiene el historial de los niveles completados por al usuario
 */

const History = () => {

    const {getHistory} = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerHistorial = async () => {
            setLoading(true);
           try {
            const res = await getHistory();
            setHistory(res);

        } catch (error) {
            console.log(error);
        } 
        finally {
            setLoading(false);
            }
        };
        obtenerHistorial();
    }, []);

  return (
    <div className='flex flex-col gap-4'>
        <h2 className='pixel-text text-spice-900'>
            Historial
        </h2>

        {loading ? 'Cargando...' : 
        history.length === 0 ? (
            <p className='text-spice-900'>No hay niveles completados</p>
        ) : (
            <table className="w-full text-left border border-spice-500 bg-spice-100/80 rounded">
                <thead className="bg-spice-600 text-spice-900">
                    <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">Nivel</th>
                    <th className="p-2">Fecha completado</th>
                    <th className="p-2">Puntos</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((entry, index) => (
                    <tr key={entry.levelId} className="border-t border-spice-500 text-xs">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2 pixel-text text-[10px]">{entry.levelName}</td>
                        <td className="p-2">{new Date(entry.completedAt).toLocaleString()}</td>
                        <td className="p-2 font-bold pixel-text text-[10px] text-center">{entry.score}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
        )}
    </div>
  )
}

export default History