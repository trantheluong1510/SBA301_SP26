import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import ListOrchid from "../data/ListOfOrchid";
import "./OrchidDetail.css";

function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const orchid = ListOrchid.find(o => o.id === id);

  if (!orchid) {
    return (
      <Container className="mt-5 text-center">
        <h3>Orchid not found</h3>
        <Button className="mt-3" onClick={() => navigate("/")}>
          Back to list
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
        <h3>Orchid Detail</h3>
      <Card className="orchid-detail-card shadow-lg border-0 rounded-5">
        <Row className="g-0 align-items-center">
          {/* IMAGE */}
          <Col md={6} className="image-wrapper">
            <img
              src={orchid.image}
              alt={orchid.orchidName}
              className="orchid-detail-img"
            />
          </Col>

          {/* INFO */}
          <Col md={6} className="p-5">
            {orchid.isSpecial && (
              <Badge bg="danger" className="mb-3 px-3 py-2">
                Special Orchid
              </Badge>
            )}

            <h1 className="orchid-title mb-3">
              {orchid.orchidName}
            </h1>

            <p className="text-muted mb-2">
              Category: <strong>{orchid.category}</strong>
            </p>

            <p className="orchid-description">
              {orchid.description}
            </p>

            <h2 className="orchid-price my-4">
              ${orchid.price}
            </h2>

            <div className="d-flex gap-3">
              
              <Button
                variant="outline-secondary"
                size="lg"
                onClick={() => navigate("/")}
              >
                ← Back
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default OrchidDetail;
