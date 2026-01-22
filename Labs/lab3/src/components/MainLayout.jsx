import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";

function MainLayout({ searchText, setSearchText }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onSearch={setSearchText} />

      {/* MAIN CONTENT */}
      <Container className="flex-grow-1 py-3 py-md-4">
        <Outlet />
      </Container>

      <Footer
        avatar="/images/a.jpg"
        name="Tran The Luong"
        email="luongttde180077@fpt.edu.vn"
      />
    </div>
  );
}

export default MainLayout;
