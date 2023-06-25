import {useTasks } from "../context/task.context";
import { Link } from "react-router-dom";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
dayjs.extend(utc)

function taskCard({task}) {

  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 my-4 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold my-2">{task.title}</h1>
        <p className="text-slate-300">{task.description}</p>
        <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
        <h2 className="font-bold my-2">Estatus: {task.status}</h2>
        <br />
        <div className="flex gap-x-3 items-center">
            <button
            className="bg-red-500 hover:bg-red-600 text white px-4 py-2 rounded-md" 
            onClick={() => {
                deleteTask(task._id)
            }}>Eliminar</button>
            <Link 
             className="bg-yellow-500 hover:bg-yellow-600 text white px-4 py-2 rounded-md" 
            to={`/tasks/${task._id}`}>Editar</Link>
        </div>
    </div>
  )
}

export default taskCard;