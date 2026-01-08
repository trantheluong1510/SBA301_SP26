import Card from "react-bootstrap/Card";

function Orchid({ orchid }) {

  return (
    <Card style={{ width: "22rem" }}>
      <Card.Img variant="top" src={orchid.image} />

      <Card.Body>
        <Card.Subtitle className="text-muted">
          ID: {orchid.id}
        </Card.Subtitle>

        <Card.Title>
          {orchid.orchidName}
          {orchid.isSpecial && (
            <span className="badge bg-danger ms-2">
              Special
            </span>
          )}
        </Card.Title>

        <Card.Subtitle>
          Category: {orchid.category}
        </Card.Subtitle>

        <Card.Text style={{ fontSize: "14px" }}>
          {orchid.description}
        </Card.Text>

        <Card.Text className="fw-bold text-success">
          Price: {orchid.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Orchid;
