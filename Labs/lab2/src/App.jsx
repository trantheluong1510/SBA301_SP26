import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrchidDetail from "./pages/OrchidDetail";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";

function App() {
  const [searchText, setSearchText] = useState("");

  return (
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
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
