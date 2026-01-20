import { useContext } from "react";
import { AuthContext } from "../../store/auth/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }

  return context;
};