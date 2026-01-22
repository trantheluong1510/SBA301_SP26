import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Orchid from "./Orchid";
import { useMemo } from "react";
import FilterSort from "./FilterSort";

function ListOrchid({ orchids, searchText }) {
  const [filterCategory, setFilterCategory] = useState("");
  const [sortType, setSortType] = useState("");

  // // Lấy danh sách category duy nhất
  // const categories = [...new Set(orchids.map(o => o.category))];

  // // FILTER + SEARCH
  // const filteredOrchids = orchids
  //   .filter(o =>
  //     o.orchidName
  //       .toLowerCase()
  //       .includes(searchText.toLowerCase())
  //   )
  //   .filter(o =>
  //     filterCategory === "" || o.category === filterCategory
  //   );

  // // SORT
  // const sortedOrchids = [...filteredOrchids].sort((a, b) => {
  //   if (sortType === "price-asc") return a.price - b.price;
  //   if (sortType === "price-desc") return b.price - a.price;
  //   if (sortType === "name-asc") return a.orchidName.localeCompare(b.orchidName);
  //   if (sortType === "name-desc") return b.orchidName.localeCompare(a.orchidName);
  //   return 0;
  // });

  // 1️ Memo danh sách category
  const categories = useMemo(() => {
    return [...new Set(orchids.map(o => o.category))];
  }, [orchids]);

  // 2️ Memo FILTER + SEARCH
  const filteredOrchids = useMemo(() => {
    return orchids
      .filter(o =>
        o.orchidName
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
      .filter(o =>
        filterCategory === "" || o.category === filterCategory
      );
  }, [orchids, searchText, filterCategory]);

  // 3️ Memo SORT
  const sortedOrchids = useMemo(() => {
    return [...filteredOrchids].sort((a, b) => {
      if (sortType === "price-asc") return a.price - b.price;
      if (sortType === "price-desc") return b.price - a.price;
      if (sortType === "name-asc") return a.orchidName.localeCompare(b.orchidName);
      if (sortType === "name-desc") return b.orchidName.localeCompare(a.orchidName);
      return 0;
    });
  }, [filteredOrchids, sortType]);

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
              xs={12}   // mobile: 1 card
              sm={6}    // mobile lớn / tablet nhỏ: 2 card
              md={4}    // iPad mini / tablet: 3 card
              lg={3}    // desktop: 4 card
              className="py-3 d-flex"
            >
              <Orchid {...orchid} />
            </Col>
          ))}
        </Row>

        {sortedOrchids.length === 0 && (
          <div className="text-center py-5 text-muted">
            <h5>Không tìm thấy hoa lan phù hợp</h5>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ListOrchid;
