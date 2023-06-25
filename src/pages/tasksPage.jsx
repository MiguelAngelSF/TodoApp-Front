import { useEffect } from "react"
import { useTasks } from "../context/task.context"
import TaskCard from "../components/taskCard";

function tasksPage() {
  const { getTasks, tasks } = useTasks();
  
  useEffect(() => {
    getTasks()
  }, [])

  if (tasks.length === 0) return (<h1>No hay tareas registradas</h1>)

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id}/>
      ))}
    </div>
  )
}

export default tasksPage;