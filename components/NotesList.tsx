import { Card, CardContent } from "@/components/ui/card";
import TimeStamp from "./shared/TimeStamps";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/PlayerContext";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import NotesForm from "./NotesForm";
import Empty from "@/public/empty.jpg";

export default function NotesList({ videoId }: { videoId: string }) {
  const { noteList, handleDeleteNote } = usePlayer();
  const notes = noteList[videoId] || [];

  // Manage individual open state for each note edit dialog
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);

  return (
    <section className="mt-8">
      <div className=" flex flex-col gap-4">
        {notes.length > 0 ? (
          notes.map((note) => (
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
                    <Dialog>
                      <DialogTrigger>
                        <Image
                          src={note.image}
                          alt="note image"
                          width={250}
                          height={250}
                        />
                      </DialogTrigger>
                      <DialogContent className=" max-w-4xl max-md:max-w-full flex justify-center items-center  ">
                        <Image
                          src={note.image}
                          alt="note image"
                          height={900}
                          width={900}
                          className="object-contain p-4 "
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                <p
                  className=" p-2 px-3 border border-gray-300 rounded-xl break-words"
                  dangerouslySetInnerHTML={{ __html: note.content }}
                ></p>

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
          ))
        ) : (
          <div className="flex flex-col justify-between items-center">
            <Image src={Empty} alt="empty notes" width={300} height={300} />
            <p className="text-center">No notes added yet</p>
          </div>
        )}
      </div>
    </section>
  );
}
