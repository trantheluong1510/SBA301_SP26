import React from "react";
import { Form } from "react-bootstrap";

function SearchBar({ onSearch }) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <Form className="mb-4">
      <Form.Group controlId="searchOrchid">
        <Form.Control
          type="text"
          placeholder="Search orchid by name..."
          onChange={handleSearchChange}
        />
      </Form.Group>
    </Form>
  );
}

export default SearchBar;
