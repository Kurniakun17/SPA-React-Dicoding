import {
  faBoxArchive,
  faMoon,
  faRightFromBracket,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ThemeContext } from "../contexts/ThemeContext";

export const Navbar = ({ onLogOutHandler }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="navbar">
      <button
        onClick={() => {
          navigate("/home");
        }}
        className="title"
      >
        MemoHub
      </button>
      <div className="navbar-btn-group">
        {theme === "light" ? (
          <button onClick={toggleTheme} aria-label="dark theme button">
            <FontAwesomeIcon size="2xl" icon={faMoon} className="icon" />
          </button>
        ) : (
          <button onClick={toggleTheme} aria-label="dark theme button">
            <FontAwesomeIcon size="2xl" icon={faSun} className="icon" />
          </button>
        )}
        <button
          onClick={() => {
            navigate("/archived");
          }}
          aria-label="go to archived page button"
        >
          <FontAwesomeIcon size="2xl" icon={faBoxArchive} className="icon" />
        </button>
        <button onClick={onLogOutHandler} aria-label="log out button">
          <FontAwesomeIcon
            size="2xl"
            icon={faRightFromBracket}
            className="icon"
          />
        </button>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  onLogOutHandler: PropTypes.func.isRequired,
};
