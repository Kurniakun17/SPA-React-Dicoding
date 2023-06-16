import React from "react";
import { Note } from "./Memo";
import PropTypes from "prop-types";

export const MemoList = ({ notes }) => {
  return (
    <div className="memo-list">
      {notes.length === 0 ? (
        <div className="memo-list-empty">
          <h2>{"Memo not found :("}</h2>
        </div>
      ) : (
        notes.map((note) => (
          <Note
            key={`note-${note.id}`}
            id={note.id}
            title={note.title}
            createdAt={note.createdAt.slice(0, 10)}
            body={note.body}
          />
        ))
      )}
    </div>
  );
};

MemoList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
