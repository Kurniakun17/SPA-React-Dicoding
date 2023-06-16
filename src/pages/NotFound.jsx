import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound">
      <div className="notfound-wrapper">
        <h1>{"Oopsie, 404 not found :("}</h1>
        <button
          onClick={() => {
            navigate("/home");
          }}
        >
          Back to Home Page
        </button>
      </div>
    </div>
  );
};
