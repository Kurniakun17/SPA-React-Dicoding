import React from "react";
import { deleteNote, getNote } from "../utils/local-data";
import { useNavigate, useParams } from "react-router-dom";
import { NotFound } from "./NotFound";
import parser from "html-react-parser";
import { Navbar } from "../components/Navbar";

export const DetailMemo = () => {
  const { id } = useParams();
  const note = getNote(id);
  const navigate = useNavigate();

  const onDeleteHandler = () => {
    navigate("/home");
    deleteNote(note.id);
  };

  return (
    <>
      {note === undefined ? (
        <NotFound />
      ) : (
        <div className="detailMemo">
          <Navbar />
          <div className="memo detailMemo-wrapper">
            <div className="detailMemo--top">
              <h2 className="memo-title">{note.title}</h2>
            </div>
            <h3 className="memo-createdAt">{note.createdAt}</h3>
            <p className="memo-body">{parser(note.body)}</p>
            <button className="btn--delete" onClick={onDeleteHandler}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};
