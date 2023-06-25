import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/auth.context"

import LoginPage from "./pages/loginPage"
import RegisterPage from "./pages/registerPage"
import TasksPage from "./pages/tasksPage"
import TaskFormPage from "./pages/taskFormPage"
import HomePage from "./pages/homePage"
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/navbar"
import { TaskProvider } from "./context/task.context"

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
          
          <Route element={<ProtectedRoute/>}>
          <Route path="/tasks" element={<TasksPage/>} />
            <Route path="/post-task" element={<TaskFormPage/>} />
            <Route path="/tasks/:id" element={<TaskFormPage/>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
          </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App