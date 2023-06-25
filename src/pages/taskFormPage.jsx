import { useForm } from "react-hook-form";
import { useTasks } from "../context/task.context";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function taskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const {createTask, getTask, updateTask} = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data)
    } else {
      createTask(data);
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
        <input 
          type="text"
          placeholder="Titulo"
          {...register("title")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          autoFocus
        />
        <textarea 
          rows='3'
          placeholder="Descripcion"
          {...register("description")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>

        <button>Agregar</button>
      </form>
    </div>
  )
}

export default taskFormPage