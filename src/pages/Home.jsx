import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { getAllNotes } from "../utils/local-data";
import { MemoList } from "../components/MemoList";

export const Home = () => {
  const { notes, searchNote, onSearchHandler } = useNotes();

  return (
    <div>
      <Navbar />
      <div className="home-wrapper">
        <h2>All Memo</h2>
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

const useNotes = () => {
  const [notes, setNotes] = useState(getAllNotes());
  const [searchNote, setSearchNote] = useState("");

  useEffect(() => {
    setNotes(
      getAllNotes().filter((note) =>
        note.title.toLocaleLowerCase().includes(searchNote.toLowerCase())
      )
    );
  }, [searchNote]);

  const onSearchHandler = (e) => {
    setSearchNote(e.target.value);
  };

  return { notes, searchNote, onSearchHandler };
};
