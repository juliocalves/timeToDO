import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { FaGoogle, FaUser, FaLock } from "react-icons/fa";
import { Clock } from "../components/Clock/Clock";
import { useNavigate } from "react-router-dom";
import "../style/loginpage.scss";
import "../style/global.scss";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError("Failed to login with Google.");
    }
  };

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div id="login-page">
      <aside>
        <Clock /> {/* Componente Clock corrigido */}
        <div>
          <p>Organize your routine,</p>
          <p>
            and have more time <strong>for you!</strong>
          </p>
        </div>
      </aside>

      <div className="container-login">
        {error && <p className="error">{error}</p>}

        <button className="google-btn" onClick={handleGoogleLogin}>
          <FaGoogle /> Login with Google
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
            placeholder="Enter your password"
          />
        </div>

        <button className="login-btn" onClick={handleEmailLogin}>
          Login
        </button>
        <span>
          Don't have an account?{" "}
          <strong>
            <a style={{ color: "white" }} href="/register">
              Create now
            </a>
          </strong>
        </span>
      </div>
    </div>
  );
}