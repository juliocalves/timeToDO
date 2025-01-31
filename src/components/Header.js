import { useState, React } from "react";
import { CiAlarmOn } from "react-icons/ci";
import { FaQuestion, FaBars } from "react-icons/fa6";
import { LogoutButton } from "./LogoutButton";
import { About } from "../components/About";

export function Header({ user, theme, toggleTheme }) {
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleModal = () => setShowModal(!showModal);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="logo">
        <CiAlarmOn className="icon" />
      </div>

      {/* Botão Sanduíche (Visível apenas em telas menores) */}
      <button className="menu-toggle" onClick={toggleMenu}>
        <FaBars />
      </button>

      {/* Menu Principal */}
      <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
        {user && <img src={user.photoURL} alt="User" className="user-photo" />}

        <button className="theme-toggle" onClick={toggleModal}>
          <FaQuestion />
        </button>
        <About show={showModal} onClose={toggleModal} />

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <LogoutButton />
      </nav>
    </header>
  );
}
