"use client";
import React, { createContext, useContext, useRef } from "react";
import YouTube from "react-youtube";

interface VideoContextType {
  playerRef: React.MutableRefObject<YouTube | null>;
}

const PlayerContext = createContext<VideoContextType | null>(null);

export default function PlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const playerRef = useRef<YouTube | null>(null);
  return (
    <PlayerContext.Provider
      value={{
        playerRef,
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
