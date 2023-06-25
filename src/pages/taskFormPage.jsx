import { useForm } from "react-hook-form";
import { useTasks } from "../context/task.context";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
dayjs.extend(utc)

function taskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const {createTask, getTask, updateTask} = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    if (params.id) {
      updateTask(params.id, dataValid)
    } else {
      createTask(dataValid);
    }
    navigate("/tasks");
  })

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue('title', task.title);
        setValue('description', task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"));
        setValue('status', task.status);
      }
    };
    loadTask();
  }, []);

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className="bg-zinc-800 max-w-md w-full p-5 rounded-md">
      <h1 className='text-2xl font-bold text-white'>Registrar tarea</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Titulo</label>
          <input 
            type="text"
            placeholder="Titulo"
            {...register("title")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          <label htmlFor="title">Descripción</label>
          <textarea 
            rows='3'
            placeholder="Descripcion"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>
          <label htmlFor="date">Fecha</label>
          <input 
            type="date"
            placeholder="Fecha"
            {...register('date')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
          />
          <label htmlFor="status">Estatus</label>
            <select 
            className="bg-zinc-700 text-sm font-medium rounded-lg block mb-2 p-2.5 dark:placeholder-gray-400 my-2"
            {...register('status')}
            >
              <option value="Sin iniciar">Sin iniciar</option>
              <option value="En curso">En curso</option>
              <option value="Completada">Completada</option>
            </select>
            <br />
          <button className="bg-green-500 px-3 py-2 rounded-md">Agregar</button>
        </form>
      </div>
    </div>
  )
}

export default taskFormPage