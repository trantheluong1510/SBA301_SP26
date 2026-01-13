import React, { useState } from 'react';
import Orchid from "./Orchid";

import FilterSort from "./FilterSort";

function ListOrchid({ orchids, searchText }) {

  const [filterCategory, setFilterCategory] = useState("");
  const [sortType, setSortType] = useState("");

  const categories = [...new Set(orchids.map(o => o.category))];

  let filteredOrchids = orchids
  .filter(o =>
    o.orchidName
      .toLowerCase()
      .includes(searchText.toLowerCase())
  )
  .filter(o =>
    filterCategory === "" || o.category === filterCategory
  );


  const sortedOrchids = [...filteredOrchids].sort((a, b) => {
    if (sortType === "price-asc") return a.price - b.price;
    if (sortType === "price-desc") return b.price - a.price;
    if (sortType === "name-asc") return a.orchidName.localeCompare(b.orchidName);
    if (sortType === "name-desc") return b.orchidName.localeCompare(a.orchidName);
    return 0;
  });

  return (
    <div className="container mt-4">
      <FilterSort
        categories={categories}
        onFilterChange={setFilterCategory}
        onSortChange={setSortType}
      />

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {sortedOrchids.map((orchid) => (
          <div key={orchid.id} className="col">
            <Orchid orchid={orchid} />
          </div>
        ))}

        {sortedOrchids.length === 0 && (
          <div className="col-12 text-center py-5">
            <p>Không tìm thấy hoa lan nào phù hợp với lựa chọn của bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListOrchid;