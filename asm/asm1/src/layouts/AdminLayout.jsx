import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/footer";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <>
      <Header />

      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>

          {/* Main Content */}
          <Col md={10} className="main-content">
            {/* Render routed content */}
            <Outlet />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
