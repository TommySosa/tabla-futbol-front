import axios from "axios"
import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"

const baseURL = 'http://localhost:3005/api/equipos'
export default function EliminarEquipo(){
    const [mensajeError, setMensajeError] = useState('')
    const [equipo, setEquipo] = useState(null)
    const [selectedEquipo, setSelectedEquipo] = useState('')
    const navigate = useNavigate()
 
    const handleSubmit = async(e) =>{
        e.preventDefault();
    
    try {
      const response = await axios.delete(`http://localhost:3005/api/equipos/${selectedEquipo}`)
      if(response.status === 201){
        setMensajeError('')
      }

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMensajeError('Todos los campos son requeridos.');
      } else if (error.response && error.response.status === 409) {
        setMensajeError('El nombre del equipo ya está en uso.');
      } else {
        setMensajeError('Error en el servidor.');
      }
    }
    }
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setEquipo(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, [equipo])

    const handleSelected = (e) => {
        const selectedId = e.target.value;
        setSelectedEquipo(selectedId);
    }

    useEffect(() => {
        if (selectedEquipo) {
          navigate(`/admin/eliminar/${selectedEquipo}`);
        }
    }, [selectedEquipo, navigate]);

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-equipo">
                <label>Nombre del equipo a eliminar</label>
                <br/>
                <br/>
                <select value={selectedEquipo} onChange={handleSelected} >
                <option value="">Selecciona un equipo</option>
                {equipo && equipo.map((equipo) => (
                    <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
                ))}
                </select>
                <br/>
                <br/>
                <label>ID: </label>
                <input type="text"value={selectedEquipo} readOnly/>
                <p>{mensajeError}</p>
                <button type="submit" className="boton-pe">Editar</button>
            </form>
        </div>
    )
}