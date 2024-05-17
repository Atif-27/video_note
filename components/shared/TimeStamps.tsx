"use client";
import { usePlayer } from "@/context/PlayerContext";
import React from "react";

export default function TimeStamp({ timestamp }: { timestamp: number }) {
  const { playerRef } = usePlayer();
  function handleTimestamp() {
    console.log(playerRef.current);
    if (!playerRef.current) {
      return;
    }
    // @ts-ignore
    playerRef.current.seekTo(timestamp);
  }
  return <button onClick={handleTimestamp}>{Number(timestamp)}</button>;
}
