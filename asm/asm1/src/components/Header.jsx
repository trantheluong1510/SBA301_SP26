import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  let name = "";
  let role = "";
  try {
    const raw = localStorage.getItem("auth_user");
    if (raw) {
      const u = JSON.parse(raw);
      name = u?.accountName || "";
      role = u?.accountRole === 1 ? "Admin" : u?.accountRole === 2 ? "Staff" : "";
    }
  } catch {}
  const onLogout = () => {
    try { localStorage.removeItem("auth_user"); } catch {}
    navigate("/login");
  };
  return (
    <div className="header">
      <div className="brand">
        <span>FUNews Management System</span>
      </div>
      <div className="actions">
        {name && (
          <span className="userchip me-2">
            <span className="avatar">{String(name).trim().charAt(0).toUpperCase()}</span>
            <span className="info">
              <strong>{name}</strong>
              {role && <span className={`role-badge ${role.toLowerCase()}`}>{role}</span>}
            </span>
          </span>
        )}
        <Button variant="outline-secondary" size="sm" onClick={onLogout}>Logout</Button>
      </div>
    </div>
  );
}
