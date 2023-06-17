import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import { useInput } from "../hooks/useInput";

export const NewMemo = () => {
  const [title, setTitle] = useInput();
  const [body, setBody] = useState();
  const navigate = useNavigate();

  const onAddHandler = () => {
    console.log(title, body);
    addNote({ title, body });
    navigate("/home");
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
              setTitle(e);
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
