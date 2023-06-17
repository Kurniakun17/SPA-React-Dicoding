import React, { useEffect, useState } from "react";
import { getArchivedNotes } from "../utils/network-data";
import { MemoList } from "../components/MemoList";
import { Navbar } from "../components/Navbar";
import PropTypes from "prop-types";

export const Archived = ({ onLogOutHandler }) => {
  const [notes, searchNote, onSearchHandler] = useArchivedNotes();

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
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchNote, setSearchNote] = useState("");

  useEffect(() => {
    getArchivedNotesAsync();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLocaleLowerCase().includes(searchNote.toLowerCase()) &&
          note.archived === true
      )
    );
  }, [searchNote]);

  const getArchivedNotesAsync = async () => {
    const res = await getArchivedNotes();
    setNotes(res.data);
    setFilteredNotes(res.data);
  };

  const onSearchHandler = (e) => {
    setSearchNote(e.target.value);
  };

  return [filteredNotes, searchNote, onSearchHandler];
};

Archived.propTypes = {
  onLogOutHandler: PropTypes.func.isRequired,
};
