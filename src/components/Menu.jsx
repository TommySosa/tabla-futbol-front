import useAuthStore from '../store/useAuthStore'
import { Link } from 'react-router-dom';

export default function Menu(){
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const { role } = useAuthStore();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout()
    }

    return (
        <div className='botones-container'>
            <Link to={"/"}>
                <button>Inicio</button>
            </Link>
            {isLoggedIn ? 
                <button onClick={handleLogout}>Cerrar sesión</button>
             : <><Link to={"/registro"}>
                <button>Registrarse</button>
            </Link> <Link to={"/login"}>
                <button>Iniciar sesión</button>
            </Link></>
            }
            {
                role == 'Administrador' ? <Link to={'admin'}><button>Admin dashboard</button></Link> : null
            }
            
        </div>
    )
}