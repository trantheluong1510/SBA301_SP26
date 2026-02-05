import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import Login from "./pages/Login";
import News from "./pages/News";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import { ToastProvider } from "./context/ToastContext.jsx";
import Toaster from "./components/Toaster.jsx";

function App() {
  return (
    <ToastProvider>
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Admin layout routes */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="news" element={<News />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;
