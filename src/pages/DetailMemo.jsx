import React from "react";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../utils/local-data";
import { useNavigate, useParams } from "react-router-dom";
import { NotFound } from "./NotFound";
import parser from "html-react-parser";
import { Navbar } from "../components/Navbar";
import PropTypes from "prop-types";

export const DetailMemo = ({ onLogOutHandler }) => {
  const { id } = useParams();
  const note = getNote(id);
  const navigate = useNavigate();

  const onDeleteHandler = () => {
    navigate("/home");
    deleteNote(note.id);
  };

  const onArchivedHandler = () => {
    navigate("/archived");
    archiveNote(note.id);
  };

  const onUnarchivedHandler = () => {
    navigate("/home");
    unarchiveNote(note.id);
  };

  return (
    <>
      {note === undefined ? (
        <NotFound />
      ) : (
        <div className="detailMemo">
          <Navbar onLogOutHandler={onLogOutHandler} />
          <div className="memo detailMemo-wrapper">
            <div className="detailMemo--top">
              <h2 className="memo-title">{note.title}</h2>
            </div>
            <h3 className="memo-createdAt">{note.createdAt}</h3>
            <p className="memo-body">{parser(note.body)}</p>
            <div className="btn-group"></div>
            {note.archived === true ? (
              <button className="btn--archived" onClick={onUnarchivedHandler}>
                Unarchived
              </button>
            ) : (
              <button className="btn--archived" onClick={onArchivedHandler}>
                Archived
              </button>
            )}

            <button className="btn--delete" onClick={onDeleteHandler}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

DetailMemo.propTypes = {
  onLogOutHandler: PropTypes.func.isRequired,
};
