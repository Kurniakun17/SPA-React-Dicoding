import React, { useEffect, useState } from "react";
import { getArchivedNotes } from "../utils/local-data";
import { MemoList } from "../components/MemoList";
import { Navbar } from "../components/Navbar";
import PropTypes from "prop-types";

export const Archived = ({ onLogOutHandler }) => {
  const { notes, searchNote, onSearchHandler } = useArchivedNotes();

  return (
    <div>
      <Navbar onLogOutHandler={onLogOutHandler} />
      <div className="archived-wrapper">
        <h2>Archived Memo</h2>
        <input
          value={searchNote}
          onChange={(e) => {
            onSearchHandler(e);
          }}
          placeholder="Search your memo here"
          type="text"
          className="searchBar"
        />
        <MemoList notes={notes} />
      </div>
    </div>
  );
};

const useArchivedNotes = () => {
  const [notes, setNotes] = useState(getArchivedNotes());
  const [searchNote, setSearchNote] = useState("");

  useEffect(() => {
    setNotes(
      getArchivedNotes().filter(
        (note) =>
          note.title.toLocaleLowerCase().includes(searchNote.toLowerCase()) &&
          note.archived === true
      )
    );
  }, [searchNote]);

  const onSearchHandler = (e) => {
    setSearchNote(e.target.value);
  };

  return { notes, searchNote, onSearchHandler };
};

Archived.propTypes = {
  onLogOutHandler: PropTypes.func.isRequired,
};
