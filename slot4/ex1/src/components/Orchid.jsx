import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ConfirmModal from "./ConfirmModal";
import "./Orchid.css";

function Orchid({ orchid }) {
  const [show, setShow] = useState(false);

  const handleConfirm = () => {
    setShow(false);
  };

  return (
    <>
      <Card className="orchid-card text-center position-relative">
        {orchid.isSpecial && (
          <span className="badge bg-danger special-badge">
            Special
          </span>
        )}

        <Card.Img
          variant="top"
          src={orchid.image}
          className="orchid-img"
          alt={orchid.orchidName}
        />

        <Card.Body>
          <Card.Title>{orchid.orchidName}</Card.Title>

          <Card.Subtitle className="mb-3 text-muted">
            Category: {orchid.category}
          </Card.Subtitle>

          <Button onClick={() => setShow(true)}>
            Detail
          </Button>
        </Card.Body>
      </Card>

      <ConfirmModal
        show={show}
        handleClose={() => setShow(false)}
        title={orchid.orchidName}
        body={
          <>
            <img
              src={orchid.image}
              alt={orchid.orchidName}
              className="img-fluid mb-2"
            />
            <p><strong>ID:</strong> {orchid.id}</p>
            <p><strong>Category:</strong> {orchid.category}</p>
            <p><strong>Description:</strong> {orchid.description}</p>
            <p className="fw-bold text-success">
              Price: {orchid.price}
            </p>
          </>
        }
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default Orchid;
