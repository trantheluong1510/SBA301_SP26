import { Navigate, useLocation } from "react-router-dom";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function isLoggedIn() {
  try {
    const token = JSON.parse(localStorage.getItem('auth_token') || '""');
    if (!token || typeof token !== "string") return false;
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return false;
    const now = Date.now();
    return payload.exp * 1000 > now;
  } catch {
    return false;
  }
}

export default function RequireAuth({ children }) {
  const location = useLocation();
  if (!isLoggedIn()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, message: "Bạn phải đăng nhập trước." }}
      />
    );
  }
  return children;
}
