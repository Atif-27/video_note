import React, { FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TimeStamp from "./shared/TimeStamps";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/PlayerContext";
export default function NotesBox({ videoId }: { videoId: string }) {
  const { playerRef, noteList, handleAddNote } = usePlayer();
  const notes = noteList[videoId] || [];
  return (
    <section>
      {/* <form
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
      </form> */}
      <ul>
        {notes.map((note) => (
          <Card key={note.id} className="w-full  ">
            <CardContent className="p-4 space-y-3">
              <div>{note.date}</div>
              <div className="flex gap-2">
                <p>Timestamp:</p>

                <TimeStamp timestamp={note.timestamp} />
              </div>
              <Input type="text" value={note.content} />
              <div className="flex justify-end gap-4">
                <Button>Edit Note</Button>
                <Button>Delete Note</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </ul>
    </section>
  );
}
