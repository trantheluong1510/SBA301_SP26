import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ConfirmModal from "./ConfirmModal";
import "./Orchid.css";

function Orchid({
  id,
  orchidName,
  image,
  category,
  description,
  price,
  isSpecial
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Card className="orchid-card h-100 text-center position-relative">
        {isSpecial && (
          <span className="badge bg-danger special-badge">
            Special
          </span>
        )}

        <Card.Img
          variant="top"
          src={image}
          className="orchid-img"
          alt={orchidName}
        />

        <Card.Body>
          <Card.Title>{orchidName}</Card.Title>

          <Card.Subtitle className="mb-3 text-muted">
            Category: {category}
          </Card.Subtitle>

          <Button onClick={() => setShow(true)}>
            Detail
          </Button>
        </Card.Body>
      </Card>

      <ConfirmModal
        show={show}
        handleClose={() => setShow(false)}
        title={orchidName}
        body={
          <>
            <img src={image} alt={orchidName} className="img-fluid mb-2" />
            <p><strong>ID:</strong> {id}</p>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Description:</strong> {description}</p>
            <p className="fw-bold text-success">
              Price: {price}
            </p>
          </>
        }
        onConfirm={() => setShow(false)}
      />
    </>
  );
}

export default Orchid;
