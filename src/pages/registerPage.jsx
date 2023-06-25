import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth.context";
import { useNavigate, Link } from "react-router-dom";


function registerPage() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const { signup, user, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  console.log(user)
  
  const onSubmit = handleSubmit(async (values) => {
   signup(values);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);
  
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center my-3">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
          registerErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white" key={i}>
              {error}
            </div>
          ))
        }
        <form onSubmit={onSubmit}>
        <h1 className='text-2xl font-bold text-white'>Registro de Usuario</h1>
          <input type="text" {...register("username", {required:true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre de usuario"/>
          {errors.username && (<p className="text-red-500">El nombre es requerido</p>)}
          <input type="email" {...register("email", {required:true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo Electrónico"/>
          {errors.email && (<p className="text-red-500">El correo es requerido</p>)}
          <input type="password" {...register("password", {required:true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"/>
          {errors.username && (<p className="text-red-500">La contraseña es requerida</p>)}
          <button className="bg-sky-500 hover:bg-sky-600 text white px-7 py-2 my-2 rounded-md" type="submit">Registrarse</button>
        </form>
        <br />
        <br />
        <p className="flex gap-x-2 justify-between">
            <Link to="/login"
            className="text-sky-500">Estas registrado? Accede</Link>
        </p>
      </div>
    </div>
  )
}

export default registerPage;