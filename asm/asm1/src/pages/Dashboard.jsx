import { Card, Row, Col } from "react-bootstrap";

export default function Dashboard() {
  return (
    <>
      <div className="page-title">
        <h3>Dashboard</h3>
      </div>

      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total News</Card.Title>
              <Card.Text>12</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Categories</Card.Title>
              <Card.Text>5</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>3</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
