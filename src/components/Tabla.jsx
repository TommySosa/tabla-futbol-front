import useAuthStore from '../store/useAuthStore'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BotonGanaron from './Botones/BotonGanaron';
import BotonEmpataron from './Botones/BotonEmpataron';
import BotonPerdieron from './Botones/BotonPerdieron';

const baseURL = 'http://localhost:3005/api/equipos';

export default function Tabla(){
    const { role } = useAuthStore();
    const [equipo, setEquipo] = useState(null)

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setEquipo(response.data);
        })
        .catch(error => {
                console.error(error);
        })
    }, [equipo])

    if (!equipo) return null

    return (
        <table className='table-bordered'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Puntos</th>
                    <th>PJ</th>
                    <th>PG</th>
                    <th>PE</th>
                    <th>PP</th>
                    <th>GF</th>
                    <th>GC</th>
                    <th>Dif</th>
                    {role === 'Administrador' ? (
                        <>
                            <th>Botones</th>
                            <th>Goles</th>
                        </>
                    ): null}
                </tr>
            </thead>
            <tbody>
                {equipo
                    .sort((a, b) => b.puntos - a.puntos)
                    .map((equipo, index) => (
                        <tr key={equipo.id}>
                            <td className='td-num'>{index + 1}</td>
                            <td className='td-nombre'>{equipo.nombre}</td>
                            <td className='td-num'>{equipo.puntos}</td>
                            <td className='td-num'>{equipo.partidos_jugados}</td>
                            <td className='td-num'>{equipo.partidos_ganados}</td>
                            <td className='td-num'>{equipo.partidos_empatados}</td>
                            <td className='td-num'>{equipo.partidos_perdidos}</td>
                            <td className='td-num'>{equipo.goles_favor}</td>
                            <td className='td-num'>{equipo.goles_contra}</td>
                            <td className='td-num'>{equipo.diferencia_goles}</td>
                            {role === 'Administrador' && (
                                <>
                                <td className='td-admin'>
                                    <BotonGanaron texto="+3" clase="botones boton-pg" equipo={equipo}></BotonGanaron>
                                    <BotonEmpataron texto="+1" clase="botones boton-pe" equipo={equipo}></BotonEmpataron>
                                    <BotonPerdieron texto="+0" clase="botones boton-pp" equipo={equipo}></BotonPerdieron> 
                                </td>
                                    <td className='td-admin'>
                                        <Link to={`equipos/${equipo.id}`}>
                                            <button className='botonVer'>Ver</button>
                                        </Link>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
            </tbody>
            
        </table>
    );
}