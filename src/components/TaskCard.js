import { useState } from "react";
import { FaTrash, FaSave } from "react-icons/fa";
import "../components/TaskCard.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../services/firebase"; // Importando a configuração do Firebase
import { doc, updateDoc } from "firebase/firestore";

export function TaskCard({ tasks, onDeleteTask, onCompleteTask, newTask, setNewTask, handleAddTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditedText(task.text);
  };

  const handleSaveEdit = async (taskId) => {
    if (editedText.trim() === "") return;
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { text: editedText });
    setEditingTaskId(null);
  };

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
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onBlur={() => handleSaveEdit(task.id)}
                    onKeyPress={(e) => e.key === "Enter" && handleSaveEdit(task.id)}
                    autoFocus
                  />
                ) : (
                  <input
                    type="text"
                    className={`form-control ${task.completed ? "completed" : ""}`}
                    value={task.text}
                    readOnly
                    onClick={() => handleEditTask(task)}
                  />
                )}
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