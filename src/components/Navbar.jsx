import { faBoxArchive, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
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
            navigate("/addmemo");
          }}
        >
          <FontAwesomeIcon size="2xl" icon={faPlus} className="icon" />
        </button>
        <button
          onClick={() => {
            navigate("/archived");
          }}
        >
          <FontAwesomeIcon size="2xl" icon={faBoxArchive} className="icon" />
        </button>
      </div>
    </div>
  );
};
