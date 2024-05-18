import { Card, CardContent } from "@/components/ui/card";
import TimeStamp from "./shared/TimeStamps";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/PlayerContext";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import NotesForm from "./NotesForm";

export default function NotesList({ videoId }: { videoId: string }) {
  const { noteList, handleDeleteNote } = usePlayer();
  const notes = noteList[videoId] || [];

  // Manage individual open state for each note edit dialog
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);

  return (
    <section className="mt-8">
      <div className=" flex flex-col gap-4">
        {notes.map((note) => (
          <Card key={note.id} className="w-full">
            <CardContent className="p-6 space-y-3">
              <div>
                <div className="font-semibold">{note.date}</div>
                <div className="flex space-x-2">
                  <p>Timestamp:</p>
                  <TimeStamp timestamp={note.timestamp} />
                </div>
              </div>
              <div className="flex gap-2">
                {note.image && (
                  <Image
                    src={note.image}
                    alt="note image"
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <div dangerouslySetInnerHTML={{ __html: note.content }}></div>

              <div className="flex justify-end gap-4">
                <Button
                  variant={"outline"}
                  onClick={() => handleDeleteNote(videoId, note.id)}
                >
                  Delete Note
                </Button>
                <Dialog
                  open={openNoteId === note.id}
                  onOpenChange={(isOpen) => {
                    setOpenNoteId(isOpen ? note.id : null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant={"outline"}>Edit Note</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[925px] max-h-screen">
                    <NotesForm
                      videoId={videoId}
                      setOpen={(isOpen) => {
                        setOpenNoteId(isOpen ? note.id : null);
                      }}
                      content={note}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
