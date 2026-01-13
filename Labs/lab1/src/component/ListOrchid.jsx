import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Orchid from "./Orchid";

function ListOrchid({ orchids }) {
  return (
    <div className="flex-grow-1">
      <Container className="py-5">
        <h2 className="text-center mb-4">Danh sách hoa lan</h2>

        <Row>
          {orchids.map((orchid) => (
            <Col
              key={orchid.id}
              md={3}     // 4 cột / hàng (12 / 3)
              sm={6}     // tablet: 2 cột
              className="py-3 d-flex"
            >
              {/* Spread operator */}
              <Orchid {...orchid} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ListOrchid;
