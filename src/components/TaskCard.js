import { FaTrash } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import "../components/TaskCard.scss"
import "bootstrap/dist/css/bootstrap.min.css";
export function TaskCard({ tasks, onDeleteTask, onCompleteTask, newTask, setNewTask, handleAddTask }) {
  return (
    <div className="task-card-container">
      <div className="card-header">
        <h2>Sua Lista de Tarefas</h2>
        <div className="input-task">
          <div className="input-group mb-3">
            <input
              type="text"
              placeholder="O que você precisa fazer?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
              />
            <button onClick={handleAddTask}>
              <FaSave />
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="body-card"> 
        {tasks.length === 0 ? (
          <p className="no-tasks">Nenhuma tarefa adicionada.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onCompleteTask(task.id, !task.completed)}
                    aria-label="Checkbox for following text input"
                  />
                </div>
                <input
                  type="text"
                  className={`form-control ${task.completed ? "completed" : ""}`}
                  aria-label="Text input with checkbox"
                  value={task.text}
                  readOnly
                />
                <span className="input-group-text">
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    <FaTrash />
                  </button>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

  );
}