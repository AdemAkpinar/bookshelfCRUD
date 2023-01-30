import React from "react";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-dark bg-warning">
        <div className="container-fluid">
          <Link class="btn btn-secondary" type="button" to="/">
            Anasayfa
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Header;
