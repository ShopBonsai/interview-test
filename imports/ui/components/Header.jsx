import React from "react";

const Header = ({ currentPage, totalPages, headerText }) =>
  <div>
    <p>{currentPage} of {totalPages}</p>
    <p>{headerText}</p>
  </div>;

export default Header;
