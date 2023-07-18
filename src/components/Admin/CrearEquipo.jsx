import axios from "axios";
import { useState } from "react";

const baseURL = 'http://localhost:3005/api/equipos'
export default function CrearEquipo (){
    const [nombre, setNombre] = useState('')
    const [mensajeError, setMensajeError] = useState('')

    const handleSubmit = async(e) =>{
        e.preventDefault();
    
    try {
      const response = await axios.post(baseURL, {
        nombre: nombre
      });
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
    const handleChange = (e) =>{
        // eslint-disable-next-line no-unused-vars
        setNombre((prev) => e.target.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-equipo">
                <label>Nombre del equipo</label>
                <br/>
                <br/>
                <input type="text" onChange={handleChange} value={nombre}/>
                <p>{mensajeError}</p>
                <button type="submit" className="boton-pg">Crear</button>
            </form>
        </div>
    )
}