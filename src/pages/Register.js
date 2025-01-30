import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { FaGoogle, FaUser, FaLock } from "react-icons/fa";
import { Clock } from "../components/Clock/Clock";
import { useNavigate } from "react-router-dom";
import "../style/loginpage.scss";
import "../style/global.scss";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para navegação
  // Cadastro com Google
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError("Failed to sign up with Google.");
    }
  };

  // Cadastro com Email/Senha
  const handleEmailSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Failed to create an account. Check your details.");
    }
  };

  return (
    <div id="login-page">
      <aside>
        <Clock />
        <div>
          <p>Organize your routine,</p>
          <p>
            and have more time <strong>for you!</strong>
          </p>
        </div>
      </aside>

      <div className="container-login">
        {error && <p className="error">{error}</p>}

        <button className="google-btn" onClick={handleGoogleSignup}>
          <FaGoogle /> Sign Up with Google
        </button>

        <div className="separator">
          <p>Or</p>
        </div>

        <div className="input-login">
          <span>
            <FaUser /> Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-login">
          <span>
            <FaLock /> Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />
        </div>
        <div className="input-login">
          <span>
            <FaLock /> Confirm Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>
        <button className="register-btn" onClick={handleEmailSignup}>
          Create Account
        </button>

        <span>
          Already have an account?{" "}
          <strong>
            <a style={{ color: "white" }} href="/login">Login</a>
          </strong>
        </span>
      </div>
    </div>
  );
}
