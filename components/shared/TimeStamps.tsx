"use client";
import { usePlayer } from "@/context/PlayerContext";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { format } from "path";
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
  return (
    <button className="text-cyan-600 underline" onClick={handleTimestamp}>
      {formatTimestamp(timestamp)}
    </button>
  );
}
