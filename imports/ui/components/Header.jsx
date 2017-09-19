// Framework
import React from "react";

// Libraries
import PropTypes from "prop-types";

const Header = ({ currentPage, totalPages, headerText }) =>
  <div>
    <p className="header-pagination">
      {currentPage} of {totalPages}
    </p>
    <p className="header-text">
      {headerText}
    </p>
  </div>;

Header.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  headerText: PropTypes.string
};

export default Header;
