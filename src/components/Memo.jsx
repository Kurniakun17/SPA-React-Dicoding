import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import parser from "html-react-parser";

export const Note = ({ id, title, createdAt, body }) => {
  const navigate = useNavigate();
  return (
    <div className="memo">
      <a
        className="memo-title"
        onClick={() => {
          navigate(`/memo/${id}`);
        }}
      >
        {title}
      </a>
      <h3 className="memo-createdAt">{createdAt}</h3>
      <p className="memo-body">{parser(body)}</p>
    </div>
  );
};

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
