import React from "react";
import Label from "../label";

const ItemsPerPage = ({ onChange, pageSize }) => {
  return (
    <div>
      <div className="d-flex align-items-center">
        <Label className="f-13 me-2">Items Per Page :</Label>
        <select className="pagination_bar" onChange={onChange}>
          <option value={pageSize} selected hidden>
            {pageSize}
          </option>

          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={500}>500</option>
        </select>
      </div>
    </div>
  );
};

export default ItemsPerPage;
