"use client";
import useNoteState from "@/hooks/useNoteState";
import { NoteType, NotesState } from "@/interface/PlayerType";
import React, {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import YouTube from "react-youtube";

interface VideoContextType {
  playerRef: React.MutableRefObject<YouTube | null>;
  noteList: NotesState;
  handleAddNote: (videoId: string, note: NoteType) => void;
  handleDeleteNote: (videoId: string, noteId: string) => void;
  handleEditNote: (videoId: string, noteId: string, note: NoteType) => void;
}

const PlayerContext = createContext<VideoContextType | null>(null);

//! This is the provider that wraps the video player and the notes list
export default function PlayerProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<YouTube | null>(null); //? This is the reference to the video player
  const { noteList, dispatch } = useNoteState(); //? This is the custom hook that manages the notes state using useReducer
  // This function is called when the user adds a note
  function handleAddNote(videoId: string, note: NoteType) {
    dispatch({
      type: "ADD_NOTE",
      payload: {
        videoId,
        note,
      },
    });
  }
  // This function is called when the user deletes a note
  function handleDeleteNote(videoId: string, noteId: string) {
    dispatch({
      type: "DELETE_NOTE",
      payload: {
        videoId,
        noteId,
      },
    });
  }
  // This function is called when the user edits a note
  function handleEditNote(videoId: string, noteId: string, content: NoteType) {
    dispatch({
      type: "EDIT_NOTE",
      payload: {
        videoId,
        noteId,
        note: content,
      },
    });
  }

  return (
    // This is the context provider that provides the player reference and the notes list to the components
    <PlayerContext.Provider
      value={{
        playerRef,
        noteList,
        handleAddNote,
        handleDeleteNote,
        handleEditNote,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
}
