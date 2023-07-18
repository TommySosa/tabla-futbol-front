import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthStore from '../store/useAuthStore'
import '../styles/forms.css';

const baseURL = 'http://localhost:3005/auth/registro';
export default function Registro() {
  const { login } = useAuthStore();
  const navigation = useNavigate();
  const [mensajeError, setMensajeError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    confirmarContraseña: '',
    rol: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(baseURL, formData);

      if (response.status === 201) {
        const userData = response.data;

        login(userData);

        navigation('/')
      } else {
        setMensajeError('Error al crear la cuenta');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMensajeError('Todos los campos son requeridos.');
      } else if (error.response && error.response.status === 409) {
        setMensajeError('El email ya está registrado.');
      } else {
        setMensajeError('Error en el servidor.');
      }
    }
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Formulario de registro</h1>
        <br />
        <label htmlFor='nombre'>Nombre</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <label htmlFor='email'>Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor='contraseña'>Contraseña</label>
        <input
          type="password"
          name="contraseña"
          id="contraseña"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={handleChange}
        />
        <label htmlFor='confirmarContraseña'>Confirmar contraseña</label>
        <input
          type="password"
          name="confirmarContraseña"
          id="confirmarContraseña"
          placeholder="Confirmar Contraseña"
          value={formData.confirmarContraseña}
          onChange={handleChange}
        />
        {formData.contraseña !== formData.confirmarContraseña && formData.confirmarContraseña !== '' && <p className='errores'>Las contraseñas no coinciden</p>}
        <label htmlFor='rol'>Rol</label>
        <select
          name="rol"
          id="rol"
          value={formData.rol}
          onChange={handleChange}
        >
          <option value="">Seleccionar Rol</option>
          <option value="Usuario">Usuario</option>
          <option value="Administrador">Administrador</option>
        </select>
        <p className='errores'>{mensajeError}</p>        
        <button type="submit">Crear Cuenta</button>
        <button onClick={() => navigation('/')}>Volver</button>
      </form>
    </div>

  );
}