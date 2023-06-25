import { Link } from "react-router-dom"
import { useAuth } from '../context/auth.context';

function navbar() {

    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <h1 className="text-2xl font-bold">Administrador de Tareas</h1>
            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li>
                            {user.username}
                        </li>
                        <li>
                            <Link to="/post-task" className="bg-cyan-700 px-4 py1 rounded-sm">Añadir Tarea</Link>
                        </li>
                        <li>
                            <Link to="/" className="bg-rose-700 px-4 py1 rounded-sm" onClick={() => logout()}>Cerrar Sesion</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="bg-cyan-700 px-4 py1 rounded-sm">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="bg-cyan-700 px-4 py1 rounded-sm">Registro</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default navbar