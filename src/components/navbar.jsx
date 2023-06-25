import { Link } from "react-router-dom"
import { useAuth } from '../context/auth.context';

function navbar() {

    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-zinc-700 flex justify-between py-5 px-10">
            <Link
                to={ isAuthenticated ? "/tasks" : "/login"}>
            <h1 className="text-2xl font-bold">Administrador de Tareas</h1>
            </Link>
            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li className="text-1xl font-bold px-8">
                            Cuenta: {user.username}
                        </li>
                        <li>
                            <Link to="/post-task" className="bg-cyan-700 px-7 py-1 rounded-md">Añadir Tarea</Link>
                        </li>
                        <li>
                            <Link to="/login" className="bg-rose-700 px-2 py-1 rounded-sm" onClick={() => logout()}>Cerrar Sesión</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="bg-cyan-500 px-4 py-2">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="bg-cyan-500 px-4 py-2">Registro</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default navbar