import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrchidDetail from "./pages/OrchidDetail";
import Login from "./pages/LoginPage";
import OrchidAdmin from "./pages/OrchidAdmin";
import MainLayout from "./components/MainLayout";

import { AuthProvider } from "../store/auth/AuthContext";

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              searchText={searchText}
              setSearchText={setSearchText}
            />
          }
        >
          <Route index element={<Home searchText={searchText} />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="orchid/:id" element={<OrchidDetail />} />
          <Route path="manage-orchids" element={<OrchidAdmin />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;