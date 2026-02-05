import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  let role = null; // 1 = Admin, 2 = Staff
  try {
    const raw = localStorage.getItem("auth_user");
    if (raw) {
      const user = JSON.parse(raw);
      role = user?.accountRole ?? null;
    }
  } catch {}

  const isAdmin = role === 1;
  const isStaff = role === 2;

  return (
    <div className="sidebar">
      <div className="title">Navigation</div>
      <Nav className="flex-column">
        {isStaff && (
          <>
            <Nav.Link as={NavLink} to="/">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/category">Category</Nav.Link>
            <Nav.Link as={NavLink} to="/news">News</Nav.Link>
            <Nav.Link as={NavLink} to="/settings">Settings</Nav.Link>
          </>
        )}
        {isAdmin && (
          <>
            <Nav.Link as={NavLink} to="/users">Users</Nav.Link>
            <Nav.Link as={NavLink} to="/settings">Settings</Nav.Link>
          </>
        )}
      </Nav>
    </div>
  );
}
