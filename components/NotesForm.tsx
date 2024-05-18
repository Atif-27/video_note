import { usePlayer } from "@/context/PlayerContext";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
export default function NotesForm({ videoId }: { videoId: string }) {
  const [open, setOpen] = useState(false);

  const { handleAddNote, playerRef } = usePlayer();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const content = {
      content: new FormData(e.currentTarget).get("content") as string,
      id: Date.now().toLocaleString(),
      // @ts-ignore
      timestamp: playerRef.current?.getCurrentTime(),
      date: new Date().toLocaleDateString(),
    };

    handleAddNote(videoId, content);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add a Note</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px]">
        <form onSubmit={handleSubmit} className=" space-y-3 mb-4 ">
          <DialogHeader>
            <DialogTitle>Add a Note</DialogTitle>
            <DialogDescription>
              A Note will be added to the video at the current timestamp.
            </DialogDescription>
          </DialogHeader>
          <Input type="text" name="content" />
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
