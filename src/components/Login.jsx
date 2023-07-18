import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from '../store/useAuthStore'
import { useState } from "react";

const baseURL = 'http://localhost:3005/auth/login';

export default function Login(){
  const [mensajeError, setMensajeError] = useState('')
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    contraseña: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
       axios.post(baseURL, formData).then((response) => {
        if (response.status === 200) {
          const userData = response.data;
          login(userData);
          navigate('/');
        } else {
          console.error('Error al iniciar sesión');
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMensajeError('Contraseña incorrecta');
      } else if (error.response && error.response.status === 404) {
        setMensajeError('Usuario no encontrado');
      } else {
        setMensajeError('Error en el servidor');
      }
    }
  }

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };


  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit} >
        <h1>Iniciar sesión</h1>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={handleChange}
        />

        {mensajeError && <p className='errores'>{mensajeError}</p>}

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>

  );
}