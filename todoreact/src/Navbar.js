import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <a class="navbar-brand" href="#"></a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#"></a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
