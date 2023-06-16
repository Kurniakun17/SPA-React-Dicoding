import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/local-data";

export const NewMemo = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState();
  const navigate = useNavigate();

  const onAddHandler = () => {
    addNote({ title, body });
    navigate("/home");
  };

  const onTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  const onBodyHandler = (e) => {
    setBody(e.target.innerHTML);
  };

  return (
    <div className="newmemo">
      <div className="newmemo-wrapper">
        <h2 className="newmemo--title">Add New Memo</h2>
        <div className="input-group">
          <h3>Title</h3>
          <input
            value={title}
            type="text"
            onChange={(e) => {
              onTitleHandler(e);
            }}
          />
        </div>
        <div className="input-group">
          <h3>Body</h3>
          <div
            className="input--body"
            onInput={(e) => {
              onBodyHandler(e);
            }}
            contentEditable
          />
        </div>
        <div className="btn-group">
          <button className="btn--add" onClick={onAddHandler}>
            Add
          </button>
          <button
            className="btn--cancel"
            onClick={() => {
              navigate("/home");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
