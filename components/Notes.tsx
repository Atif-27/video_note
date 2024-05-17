"use client";
import { usePlayer } from "@/context/PlayerContext";
import { time, timeStamp } from "console";
import React, { FormEvent } from "react";
import TimeStamp from "./shared/TimeStamps";

export default function Notes({ videoId }: { videoId: string }) {
  const { playerRef, noteList, handleAddNote } = usePlayer();
  const notes = noteList[videoId] || [];
  return (
    <section id="Notes">
      <h2>Notes</h2>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const content = {
            content: new FormData(e.currentTarget).get("content") as string,
            id: Date.now().toLocaleString(),
            // @ts-ignore
            timestamp: playerRef.current?.getCurrentTime(),
            date: new Date().toLocaleDateString(),
          };
          console.log(content);

          handleAddNote(videoId, content);
        }}
      >
        <input type="text" name="content" />
        <button type="submit">Add Note</button>
      </form>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <p>{note.content}</p>
            <TimeStamp timestamp={note.timestamp}>{note.timestamp}</TimeStamp>
            <button onClick={() => {}}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
