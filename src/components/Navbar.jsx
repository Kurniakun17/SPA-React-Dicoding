import {
  faBoxArchive,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const Navbar = ({ onLogOutHandler }) => {
  const navigate = useNavigate();
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
