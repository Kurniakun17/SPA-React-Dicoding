import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { MemoList } from "../components/MemoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getActiveNotes } from "../utils/network-data";

export const Home = ({ onLogOutHandler, user }) => {
  const navigate = useNavigate();
  const [notes, searchNote, loading, onSearchHandler] = useNotes(
    user,
    navigate
  );

  return (
    <div>
      <Navbar onLogOutHandler={onLogOutHandler} />
      <div className="home-wrapper">
        <h2>Active Memo</h2>
        <input
          value={searchNote}
          onChange={(e) => {
            onSearchHandler(e);
          }}
          placeholder="Search your memo here"
          type="text"
          className="searchBar"
        />
        {loading ? (
          <>
            <h1>Loading...</h1>
          </>
        ) : (
          <MemoList notes={notes} />
        )}
      </div>
      <button
        onClick={() => {
          navigate("/addmemo");
        }}
        className="floating-add"
        aria-label="add memo"
      >
        <FontAwesomeIcon size="2x" icon={faPlus} className="icon add" />
      </button>
    </div>
  );
};

const useNotes = (user, navigate) => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchNote, setSearchNote] = useState("");

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
    getActiveNotesAsync();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      notes.filter((note) =>
        note.title.toLocaleLowerCase().includes(searchNote.toLowerCase())
      )
    );
  }, [searchNote]);

  const getActiveNotesAsync = async () => {
    const res = await getActiveNotes();
    setNotes(res.data);
    setFilteredNotes(res.data);
    setLoading(false);
  };

  const onSearchHandler = (e) => {
    setSearchNote(e.target.value);
  };

  return [filteredNotes, searchNote, loading, onSearchHandler];
};

Home.propTypes = {
  onLogOutHandler: PropTypes.func.isRequired,
};
