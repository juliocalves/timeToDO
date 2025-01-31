import { useState, useEffect } from "react";
import { FaPlay, FaPause, FaUndo } from "react-icons/fa";
import "./PomodoroTimer.scss";

export function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60); // Tempo em segundos
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [customTime, setCustomTime] = useState(25); // Tempo personalizado em minutos
  const [isEditing, setIsEditing] = useState(false);

  const timeSettings = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setTime(timeSettings[newMode]);
    setIsRunning(false);
    setIsEditing(false);
  };

  // Aplica o tempo automaticamente
  const applyCustomTime = () => {
    if (customTime > 0) {
      setTime(customTime * 60);
      setIsEditing(false);
    }
  };

  const resetTimer = () => {
    setTime(timeSettings[mode] || customTime * 60);
    setIsRunning(false);
    setIsEditing(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="pomodoro-container">
      <h2>Prepare-se para se concentrar</h2>
      <div className="timer-modes">
        <button onClick={() => changeMode("focus")} className={mode === "focus" ? "active" : ""}>
          Foco
        </button>
        <button onClick={() => changeMode("shortBreak")} className={mode === "shortBreak" ? "active" : ""}>
          Pausa Curta
        </button>
        <button onClick={() => changeMode("longBreak")} className={mode === "longBreak" ? "active" : ""}>
          Pausa Longa
        </button>
      </div>

      <div className="timer-display">
        {isEditing ? (
          <input
            className="custom-time-input"
            type="number"
            value={customTime}
            onChange={(e) => setCustomTime(Number(e.target.value))}
            onBlur={applyCustomTime} // Aplica ao clicar fora
            onKeyDown={(e) => e.key === "Enter" && applyCustomTime()} // Aplica ao pressionar Enter
            min="1"
            placeholder="Minutos"
            autoFocus
          />
        ) : (
          <span onDoubleClick={() => !isRunning && setIsEditing(true)}>
            {formatTime(time)}
          </span>
        )}
      </div>

      <div className="controls">
        <button className="start-stop-btn" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? <FaPause /> : <FaPlay />}
        </button>
        <button className="reset-btn" onClick={resetTimer}>
          <FaUndo />
        </button>
      </div>
    </div>
  );
}
