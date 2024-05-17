"use client";
import useNoteState from "@/hooks/useNoteState";
import { NotesState } from "@/interface/PlayerType";
import React, { createContext, useContext, useRef } from "react";
import YouTube from "react-youtube";

interface VideoContextType {
  playerRef: React.MutableRefObject<YouTube | null>;
  noteList: NotesState;
  dispatch: React.Dispatch<any>;
}

const PlayerContext = createContext<VideoContextType | null>(null);

export default function PlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const playerRef = useRef<YouTube | null>(null);
  const { noteList, dispatch } = useNoteState();
  return (
    <PlayerContext.Provider
      value={{
        playerRef,
        noteList,
        dispatch,
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
