// Header.js
import { useState ,React} from "react";
import { CiAlarmOn } from "react-icons/ci";
import { LogoutButton } from "./LogoutButton";
import { FaQuestion } from "react-icons/fa6";
import { About } from "../components/About"; // Importa o modal
export function Header({ user, theme, toggleTheme }) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);

  return (
    <header>
      <div className="logo">
        <CiAlarmOn className="tomato-icon" />
      </div>
      <div className="user-info">
        {user && (
          <>
            <img src={user.photoURL} alt="User" className="user-photo" />
          </>
        )}

        <button className="theme-toggle" onClick={toggleModal}>
            <FaQuestion />
        </button>
        <About show={showModal} onClose={toggleModal} />

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <LogoutButton />
      </div>
    </header>
  );
}