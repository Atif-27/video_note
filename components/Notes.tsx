"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NotesList from "./NotesList";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IoMdAddCircleOutline } from "react-icons/io";
import NotesForm from "./NotesForm";

//! This component is used to display the notes section of the application
export default function Notes({ videoId }: { videoId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <section id="Notes" className="mb-6">
      <Card>
        <CardHeader>
          <CardTitle>My Notes</CardTitle>
          <CardDescription>
            All your notes at a single place. Click on any timestamp to go to
            specific timestamp in the video.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add A Note Button */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="flex justify-end">
                <Button variant="outline" className="flex gap-2  w-fit ">
                  <IoMdAddCircleOutline />
                  Add new Note
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[925px]  max-h-screen   ">
              <NotesForm videoId={videoId} setOpen={setOpen} />
            </DialogContent>
          </Dialog>

          {/* Note List Component */}
          <NotesList videoId={videoId} />
        </CardContent>
      </Card>
    </section>
  );
}
