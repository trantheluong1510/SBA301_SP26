import Card from "react-bootstrap/Card";
import "./Orchid.css";

function Orchid({ orchid }) {
  return (
    <Card className="orchid-card h-100">
      <Card.Img
        variant="top"
        src={orchid.image}
        className="orchid-img"
      />

      <Card.Body>
        <Card.Subtitle className="text-muted mb-1">
          ID: {orchid.id}
        </Card.Subtitle>

        <Card.Title>
          {orchid.orchidName}
          {orchid.isSpecial && (
            <span className="badge bg-danger ms-2">Special</span>
          )}
        </Card.Title>

        <Card.Subtitle className="mb-2 text-secondary">
          Category: {orchid.category}
        </Card.Subtitle>

        <Card.Text style={{ fontSize: "14px" }}>
          {orchid.description}
        </Card.Text>

        <Card.Text className="orchid-price">
          Price: {orchid.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Orchid;
