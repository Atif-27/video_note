"use client";
import { usePlayer } from "@/context/PlayerContext";
import React from "react";

export default function TimeStamp({
  timestamp,
  children,
}: {
  timestamp: number;
  children: React.ReactNode;
}) {
  const { playerRef } = usePlayer();
  function handleTimestamp() {
    console.log("Seeking to timestampaa", timestamp);

    console.log(playerRef.current);
    if (!playerRef.current) {
      return;
    }
    // @ts-ignore
    playerRef.current.seekTo(timestamp);
  }
  return <button onClick={handleTimestamp}>{children}</button>;
}
