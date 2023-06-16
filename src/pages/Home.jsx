import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Note } from "../components/Memo";
import { getAllNotes } from "../utils/local-data";

export const Home = () => {
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

  return (
    <div className="home">
      <Navbar />
      <div className="home-wrapper">
        <input
          value={searchNote}
          onChange={(e) => {
            onSearchHandler(e);
          }}
          placeholder="Search your memo here"
          type="text"
          className="searchBar"
        />
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
      </div>
    </div>
  );
};
