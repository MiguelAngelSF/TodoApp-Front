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
    <div className="flex h-[calc(80vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
          registerErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white" key={i}>
              {error}
            </div>
          ))
        }
        <form onSubmit={onSubmit}>
          <input type="text" {...register("username", {required:true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"/>
          {errors.username && (<p className="text-red-500">El username es requerido</p>)}
          <input type="email" {...register("email", {required:true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="E-mail"/>
          {errors.email && (<p className="text-red-500">El e-mail es requerido</p>)}
          <input type="password" {...register("password", {required:true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"/>
          {errors.username && (<p className="text-red-500">La contraseña es requerida</p>)}
          <button type="submit">Registrarse</button>
        </form>

        <p className="flex gap-x-2 justify-between">
            Estas registrado? Accede<Link to="/login"
            className="text-sky-500">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default registerPage;