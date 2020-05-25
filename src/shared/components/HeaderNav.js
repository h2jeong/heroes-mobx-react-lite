import React, { useState, useContext } from "react";
import { Link } from "@reach/router";
import { villainContext } from "../../villains/villain-context";

export default function HeaderNav() {
  const villainStore = useContext(villainContext);
  const [navIsCollapse, setnavIsCollapse] = useState(true);

  const toggleNavBar = () => {
    setnavIsCollapse(!navIsCollapse);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">
        <li className="fas fa-cube" />
        React Tour of Heroes
      </span>
      <button
        onClick={toggleNavBar}
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls=" navbarSupportedContent"
        aria-expanded="false"
        aria-label=" Toggle navigation"
      >
        <span className=" navbar-toggle-icon" />
      </button>

      <div
        className={
          navIsCollapse ? "collapse navbar-collapse" : "navbar-collapse"
        }
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Heros
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/villains">
              Villains
            </Link>
          </li>
        </ul>

        <span className="mr-5" style={{ color: "purple", fontSize: "24px" }}>
          Total heroes:{" "}
        </span>

        <span className="mr-5" style={{ color: "purple", fontSize: "24px" }}>
          Total villains:{villainStore.villains.length}
        </span>

        <ul className="navbar-nav my-2 my-lg-0">
          <li className="nav-item">
            <a
              className="nav-link"
              rel="noopener norererrer"
              target="_blink"
              href="https://twitter.com/DevlinDuldulao"
            >
              <i className="layout-icon fab fa-twitter" />
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              rel="noopener norererrer"
              target="_blink"
              href="https://github.com/sebmasterdevlin"
            >
              <i className="layout-icon fab fa-github" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
