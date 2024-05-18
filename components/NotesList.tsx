import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TimeStamp from "./shared/TimeStamps";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/PlayerContext";
export default function NotesList({ videoId }: { videoId: string }) {
  const {
    playerRef,
    noteList,
    handleDeleteNote,
    handleAddNote,
    handleEditNote,
  } = usePlayer();
  const notes = noteList[videoId] || [];
  return (
    <section>
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
                <Button onClick={() => handleDeleteNote(videoId, note.id)}>
                  Delete Note
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </ul>
    </section>
  );
}
