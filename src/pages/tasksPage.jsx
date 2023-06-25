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
    <div className="grid grid-cols-4 gap-2">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id}/>
      ))}
    </div>
  )
}

export default tasksPage;