import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home'
import NotFound from "../pages/NotFound";
import Login from '../components/Login'
import Registro from "../components/Registro";
import VerEquipo from "../components/VerEquipo";
import Tabla from "../components/Tabla";
import AdminDashboard from "../components/AdminDashboard";
import CrearEquipo from "../components/Admin/CrearEquipo";
import EditarEquipo from "../components/Admin/EditarEquipo";
import EliminarEquipo from "../components/Admin/EliminarEquipo";
export const browserRouter = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
               errorElement: <NotFound />,
               children: [
                {
                    index: true,
                    element: <Tabla />
                },
                {
                    path: '/equipos/:id',
                    element: <VerEquipo />
                },
                {
                    path: '/admin',
                    element: <AdminDashboard />,
                    children: [
                        {
                            path: '/admin/crear',
                            element: <CrearEquipo />
                        },
                        {
                            path: '/admin/editar',
                            element: <EditarEquipo />
                        },
                        {
                            path: '/admin/editar/:id',
                            element: <EditarEquipo />
                        },
                        {
                            path: '/admin/eliminar',
                            element: <EliminarEquipo />
                        },
                        {
                            path: '/admin/eliminar/:id',
                            element: <EliminarEquipo />
                        },
                    ]
                }
                
               ] 
            }
        ],
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/registro',
        element: <Registro />
    }
])