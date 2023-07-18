import useAuthStore from "../store/useAuthStore";
import Restringido from '../pages/Restringido'
import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard(){
    const { role } = useAuthStore();

    return(
        <>
            {
                role === 'Administrador' ? 
                <div>
                    <Link to={'/admin/crear'}>
                        <button className="boton-pg">Crear equipo</button>
                    </Link>
                    <Link to={'/admin/editar'}>
                        <button className="boton-pe">Editar equipo</button>
                    </Link>
                    <Link to={'/admin/eliminar'}>
                        <button className="boton-pp">Eliminar equipo</button>
                    </Link>
                <div>
                    <Outlet />
                </div>

                </div> : <Restringido />
            }
        </>
    )
}