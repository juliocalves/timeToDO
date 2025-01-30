import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase";

// Criando o contexto de autenticação
const AuthContext = createContext();

// Provedor do AuthContext
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verifica o estado de autenticação do usuário
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout: () => signOut(auth) }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acessar o contexto
export function useAuth() {
  return useContext(AuthContext);
}
