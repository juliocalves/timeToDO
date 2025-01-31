import { useState, useEffect } from "react";
import "./PomodoroTimer.scss"; // Importar o arquivo de estilo

export function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [customTime, setCustomTime] = useState(25); // Tempo personalizado em minutos

  // Configurações de tempo
  const timeSettings = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  // Função para alternar entre os modos
  const changeMode = (newMode) => {
    setMode(newMode);
    setTime(timeSettings[newMode]);
    setIsRunning(false);
  };

  // Configuração personalizada
  const setCustomTimer = () => {
    if (customTime > 0) {
      setTime(customTime * 60);
      setMode("custom");
      setIsRunning(false);
    }
  };

  // Resetar o timer
  const resetTimer = () => {
    setTime(timeSettings[mode] || customTime * 60);
    setIsRunning(false);
  };

  // Efeito para decrementar o tempo quando o timer está rodando
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

  // Formata o tempo para MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="pomodoro-container">
      <h2>Prepare-se para se concentrar</h2>
      <div className="timer-modes">
        <button onClick={() => changeMode("focus")} className={mode === "focus" ? "active" : ""}>Foco</button>
        <button onClick={() => changeMode("shortBreak")} className={mode === "shortBreak" ? "active" : ""}>Pausa Curta</button>
        <button onClick={() => changeMode("longBreak")} className={mode === "longBreak" ? "active" : ""}>Pausa Longa</button>
      </div>

      <div className="timer-display">{formatTime(time)}</div>

      <div className="controls">
        <button className="start-stop-btn" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "PAUSAR" : "INICIAR"}
        </button>
        <button className="reset-btn" onClick={resetTimer}>RESETAR</button>
      </div>

      <div className="custom-timer">
        <input
          type="number"
          value={customTime}
          onChange={(e) => setCustomTime(Number(e.target.value))}
          min="1"
        />
        <button onClick={setCustomTimer}>Definir Tempo Personalizado</button>
      </div>
    </div>
  );
}