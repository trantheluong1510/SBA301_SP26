import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Orchid from "./Orchid";
import FilterSort from "./FilterSort";

function ListOrchid({ orchids, searchText }) {
  const [filterCategory, setFilterCategory] = useState("");
  const [sortType, setSortType] = useState("");

  // Lấy danh sách category duy nhất
  const categories = [...new Set(orchids.map(o => o.category))];

  // FILTER + SEARCH
  const filteredOrchids = orchids
    .filter(o =>
      o.orchidName
        .toLowerCase()
        .includes(searchText.toLowerCase())
    )
    .filter(o =>
      filterCategory === "" || o.category === filterCategory
    );

  // SORT
  const sortedOrchids = [...filteredOrchids].sort((a, b) => {
    if (sortType === "price-asc") return a.price - b.price;
    if (sortType === "price-desc") return b.price - a.price;
    if (sortType === "name-asc") return a.orchidName.localeCompare(b.orchidName);
    if (sortType === "name-desc") return b.orchidName.localeCompare(a.orchidName);
    return 0;
  });

  return (
    <div className="flex-grow-1">
      <Container className="py-5">
        <h2 className="text-center mb-4">Danh sách hoa lan</h2>

        <FilterSort
          categories={categories}
          onFilterChange={setFilterCategory}
          onSortChange={setSortType}
        />

        <Row>
          {sortedOrchids.map((orchid) => (
            <Col
              key={orchid.id}
              md={3}     // desktop: 4 cột
              sm={6}     // tablet: 2 cột
              className="py-3 d-flex"
            >
              <Orchid {...orchid} />
            </Col>
          ))}
        </Row>

        {sortedOrchids.length === 0 && (
          <div className="text-center py-5">
            <p>Không tìm thấy hoa lan nào phù hợp.</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ListOrchid;
