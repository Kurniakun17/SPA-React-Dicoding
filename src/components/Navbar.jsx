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
      <h2
        onClick={() => {
          navigate("/addmemo");
        }}
      >
        Add Memo
      </h2>
    </div>
  );
};
