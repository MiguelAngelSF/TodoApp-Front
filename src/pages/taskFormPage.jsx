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
    if (params.id) {
      updateTask(params.id, {
        ...data,
        date: dayjs.utc(data.date).format()
      });
    } else {
      createTask({
        ...data,
        date: dayjs.utc(data.date).format()
      });
    };
    navigate("/tasks")
  })

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue('title', task.title);
        setValue('description', task.description);
      }
    };
    loadTask();
  }, []);

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
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
        <button className="bg-green-500 px-3 py-2 rounded-md">Agregar</button>
      </form>
    </div>
  )
}

export default taskFormPage