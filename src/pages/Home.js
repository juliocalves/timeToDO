import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {
  getTasks,
  addTask,
  deleteTask,
  completeTask,
} from "../services/firestore";
import { LogoutButton } from "../components/LogoutButton";
import "../style/global.scss";
import "../style/home.scss";
import { CiAlarmOn } from "react-icons/ci";
import { PomodoroTimer } from "../components/PomodoroTimer";
import { TaskCard } from "../components/TaskCard";
import { Toast } from "../components/Toast";
import { lightTheme, darkTheme } from "../thema"; // Importar os temas
import "bootstrap/dist/css/bootstrap.min.css";
export function HomePage() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userTasks = await getTasks(currentUser.uid);
        setTasks(userTasks);
        setShowToast(true);
      }
    });

    return () => unsubscribe();
  }, []);

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

  // Aplicar o tema ao carregar a página ou ao alterar o tema
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

      <header>
        <div className="logo">
          <CiAlarmOn className="tomato-icon" />
          <span>Pomodoro Timer</span>
        </div>
        <div className="user-info">
          {user && (
            <>
              <img src={user.photoURL} alt="User" className="user-photo" />
            </>
          )}

          <a href="/about">Sobre</a>

          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          
          <LogoutButton />
        </div>
      </header>

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