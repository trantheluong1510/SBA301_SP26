import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Orchid.css";
import { useNavigate } from "react-router-dom";

function Orchid({
  id,
  orchidName,
  image,
  category,
  isSpecial
}) {
  const navigate = useNavigate();

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

          <Button
            onClick={() => navigate(`/orchid/${id}`)}
          >
            Detail
          </Button>
        </Card.Body>
      </Card>


    </>
  );
}

export default Orchid;
