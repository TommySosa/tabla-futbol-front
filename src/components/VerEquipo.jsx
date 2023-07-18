import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import '../styles/verEquipo.css'

export default function VerEquipo() {
    const { id } = useParams()
    const [equipo, setEquipo] = useState(null)
    const baseURL = `http://localhost:3005/api/equipos/${id}`;
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setEquipo(response.data);
        })
            .catch(error => {
                console.error(error);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    if (!equipo) return null
    return (
        <div className="container">
            <div className="tabla-container-1">
                    <table className='table-bordered'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Puntos</th>
                                <th>PJ</th>
                                <th>PG</th>
                                <th>PE</th>
                                <th>PP</th>
                                <th>GF</th>
                                <th>GC</th>
                                <th>Dif</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr key={equipo.id}>
                                <td className="td-nombre">{equipo.nombre}</td>
                                <td className="td-num">{equipo.puntos}</td>
                                <td className="td-num">{equipo.partidos_jugados}</td>
                                <td className="td-num">{equipo.partidos_ganados}</td>
                                <td className="td-num">{equipo.partidos_empatados}</td>
                                <td className="td-num">{equipo.partidos_perdidos}</td>
                                <td className="td-num">{equipo.goles_favor}</td>
                                <td className="td-num">{equipo.goles_contra}</td>
                                <td className="td-num">{equipo.diferencia_goles}</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
                <Link to='/'>
                    <button className="boton-volver">Volver</button>
                </Link>
        </div>
    )
}