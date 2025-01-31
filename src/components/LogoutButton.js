import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      <FaSignOutAlt className="logout-icon" />
    </button>
  );
}
