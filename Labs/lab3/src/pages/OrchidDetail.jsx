import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import "./OrchidDetail.css";

function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchOrchids() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:8080/orchids");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (isMounted) setOrchids(Array.isArray(data) ? data : []);
      } catch (e) {
        if (isMounted) setError(e.message || "Failed to load orchids");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchOrchids();
    return () => {
      isMounted = false;
    };
  }, []);

  const orchid = useMemo(() => orchids.find((o) => String(o.id) === String(id)), [orchids, id]);

  if (loading) {
    return <Container className="mt-5 mb-5 text-center">Loading...</Container>;
  }

  if (error) {
    return (
      <Container className="mt-5 mb-5 text-center text-danger">{error}</Container>
    );
  }

  if (!orchid) {
    return (
      <Container className="mt-5 mb-5 text-center">
        <h3>Orchid not found</h3>
        <Button
          variant="outline-secondary"
          size="lg"
          onClick={() => navigate("/")}
        >
          ← Back
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
