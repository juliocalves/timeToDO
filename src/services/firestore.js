import { db } from "./firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp, query, where } from "firebase/firestore";

// 📌 Adicionar uma nova tarefa no Firestore
export const addTask = async (userId, text) => {
  try {
    await addDoc(collection(db, "tasks"), {
      userId,
      text,
      completed: false,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Erro ao adicionar tarefa: ", error);
  }
};

// 📌 Listar tarefas do usuário logado
export const getTasks = async (userId) => {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// 📌 Atualizar status de uma tarefa (marcar como concluída)
export const completeTask = async (taskId, completed) => {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, { completed });
};

// 📌 Excluir uma tarefa
export const deleteTask = async (taskId) => {
  await deleteDoc(doc(db, "tasks", taskId));
};
