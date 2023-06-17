import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { getAllNotes } from "../utils/local-data";
import { MemoList } from "../components/MemoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const Home = ({ onLogOutHandler }) => {
  const { notes, searchNote, onSearchHandler } = useNotes();
  const navigate = useNavigate();
  return (
    <div>
      <Navbar onLogOutHandler={onLogOutHandler} />
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
      <button
        onClick={() => {
          navigate("/addmemo");
        }}
        className="floating-add"
        aria-label="add memo"
      >
        <FontAwesomeIcon size="2x" icon={faPlus} className="icon" />
      </button>
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

Home.propTypes = {
  onLogOutHandler: PropTypes.func.isRequired,
};
