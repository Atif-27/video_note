import { NotesState, ActionType } from "@/interface/PlayerType";
import {
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  LOAD_NOTES,
} from "@/utils/noteActions";
import { useEffect, useReducer } from "react";

// ! This hook is used to manage the state of notes for each video.
export default function useNoteState() {
  const [noteList, dispatch] = useReducer(reducer, {});
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      dispatch({ type: LOAD_NOTES, payload: JSON.parse(savedNotes) });
    }
  }, []);

  useEffect(() => {
    if (noteList && Object.keys(noteList).length > 0) {
      localStorage.setItem("notes", JSON.stringify(noteList));
    }
  }, [noteList]);
  return { noteList, dispatch };
}

// ! This reducer function is used to manage the state of notes for each video.
const reducer = (state: NotesState, action: ActionType): NotesState => {
  switch (action.type) {
    case ADD_NOTE: {
      const { videoId, note } = action.payload;
      const notes = state[videoId] || [];
      return {
        ...state,
        [videoId]: [...notes, note],
      };
    }
    case EDIT_NOTE: {
      const { videoId, noteId, content } = action.payload;
      const notes = state[videoId].map((note) =>
        note.id === noteId ? { ...note, content } : note
      );
      return {
        ...state,
        [videoId]: notes,
      };
    }
    case DELETE_NOTE: {
      const { videoId, noteId } = action.payload;
      const notes = state[videoId].filter((note) => note.id !== noteId);
      return {
        ...state,
        [videoId]: notes,
      };
    }
    case LOAD_NOTES: {
      return action.payload;
    }
    default:
      return state;
  }
};
