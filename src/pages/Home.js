// HomePage.js
import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { getTasks, addTask, deleteTask, completeTask } from "../services/firestore";
import { useNavigate } from "react-router-dom"; // Importe o hook useNavigate
import "../style/global.scss";
import "../style/home.scss";
import { PomodoroTimer } from "../components/PomodoroTimer";
import { TaskCard } from "../components/TaskCard";
import { Toast } from "../components/Toast";
import { lightTheme, darkTheme } from "../thema"; // Importar os temas
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "../components/Header"; // Importar o componente Header

export function HomePage() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userTasks = await getTasks(currentUser.uid);
        setTasks(userTasks);
        setShowToast(true);
      } else {
        // Se o usuário não estiver autenticado, redirecione para a página de login
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    await addTask(user.uid, newTask);
    setNewTask("");
    const updatedTasks = await getTasks(user.uid);
    setTasks(updatedTasks);
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    const updatedTasks = await getTasks(user.uid);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = async (taskId, completed) => {
    await completeTask(taskId, completed);
    const updatedTasks = await getTasks(user.uid);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const applyTheme = () => {
      const selectedTheme = theme === "light" ? lightTheme : darkTheme;
      Object.entries(selectedTheme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value);
      });
    };

    applyTheme();
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div id="home-page">
      {showToast && user && (
        <Toast
          message={`Bem-vindo, ${user.displayName || "Usuário"}!`}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}

      <Header user={user} theme={theme} toggleTheme={toggleTheme} />

      <div className="content">
        <PomodoroTimer />

        <TaskCard
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onCompleteTask={handleCompleteTask}
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddTask={handleAddTask}
        />
      </div>
    </div>
  );
}