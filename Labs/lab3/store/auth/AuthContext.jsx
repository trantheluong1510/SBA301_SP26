import { createContext, useReducer } from "react";
import { authReducer, INITIAL_STATE } from "./authReducer";

// 1. Tạo Context
export const AuthContext = createContext();

// 2. Mock Data (Giả lập Database)
const mockAccounts = [
  { id: 1, username: 'admin', password: '123', role: 'admin', name: 'Admin User' },
  { id: 2, username: 'user1', password: '123', role: 'user', name: 'Nguyen Van A' },
  { id: 3, username: 'user2', password: '123', role: 'user', name: 'Tran Thi B' }
];

// 3. Tạo Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const loginAction = (username, password) => {
    dispatch({ type: "SUBMIT_ATTEMPT" });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Tìm user trong mockAccounts
        const foundUser = mockAccounts.find(
          (acc) => acc.username === username && acc.password === password
        );

        if (foundUser) {
          // Thành công
          dispatch({ type: "LOGIN_SUCCESS", payload: foundUser });
          resolve(foundUser);
        } else {
          // Thất bại
          dispatch({ type: "LOGIN_FAILURE", payload: "Tài khoản hoặc mật khẩu không đúng!" });
          reject("Login failed");
        }
      }, 800);
    });
  };

  // Dữ liệu chia sẻ
  const contextValue = {
    state,
    dispatch,
    loginAction, // Xuất hàm này ra để Page dùng
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};