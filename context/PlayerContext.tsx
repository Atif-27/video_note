"use client";
import useNoteState from "@/hooks/useNoteState";
import { NoteType, NotesState } from "@/interface/PlayerType";
import React, { createContext, useContext, useRef } from "react";
import YouTube from "react-youtube";

interface VideoContextType {
  playerRef: React.MutableRefObject<YouTube | null>;
  noteList: NotesState;
  handleAddNote: (videoId: string, note: NoteType) => void;
  handleDeleteNote: (videoId: string, noteId: string) => void;
  handleEditNote: (videoId: string, noteId: string, note: NoteType) => void;
}

const PlayerContext = createContext<VideoContextType | null>(null);

export default function PlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const playerRef = useRef<YouTube | null>(null);
  const { noteList, dispatch } = useNoteState();
  function handleAddNote(videoId: string, note: NoteType) {
    dispatch({
      type: "ADD_NOTE",
      payload: {
        videoId,
        note,
      },
    });
  }
  function handleDeleteNote(videoId: string, noteId: string) {
    dispatch({
      type: "DELETE_NOTE",
      payload: {
        videoId,
        noteId,
      },
    });
  }
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
