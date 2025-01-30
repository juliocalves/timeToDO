import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { LogoutButton } from "../components/LogoutButton";
import "../style/global.scss";
import "../style/home.scss";
import { CiAlarmOn } from "react-icons/ci";
import { PomodoroTimer } from "../components/PomodoroTimer";

export function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verifica se há um usuário logado
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div id="home-page">
      <header>
        <div className="logo"><CiAlarmOn className="tomato-icon" /></div>
        {/* <div className="tasks">Tasks</div> */}

        {/* Exibir nome do usuário e foto, se logado */}
        <div className="user-info">
          {user && (
            <>
              <span className="greeting">Hello, {user.displayName}!</span>
              <img src={user.photoURL} alt="User" className="user-photo" />
            </>
          )}
          <LogoutButton />
        </div>
      </header>

      <div className="content">
        <div className="pomodoro-content">
          <PomodoroTimer />

          <div className="task-list">
            <div className="input-task">
              <span>Task list</span>
              <input placeholder="What's your task?" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
