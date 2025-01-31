// AuthContext.js ou AuthProvider.js
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "../services/firebase"; // Importe o auth do seu arquivo de configuração do Firebase

// Criando o contexto de autenticação
const AuthContext = createContext();

// Provedor do AuthContext
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Configura a persistência de autenticação
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Persistência de autenticação configurada com sucesso.");
      })
      .catch((error) => {
        console.error("Erro ao configurar persistência de autenticação:", error);
      });
  }, []);

  useEffect(() => {
    // Verifica o estado de autenticação do usuário
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Salva o usuário no localStorage
        localStorage.setItem("user", JSON.stringify(currentUser));
        setUser(currentUser);
      } else {
        // Remove o usuário do localStorage se não estiver autenticado
        localStorage.removeItem("user");
        setUser(null);
      }
    });

    // Verifica se há um usuário salvo no localStorage ao carregar a página
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }

    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("user"); // Remove o usuário do localStorage ao fazer logout
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acessar o contexto
export function useAuth() {
  return useContext(AuthContext);
}