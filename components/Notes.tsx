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
export default function Notes({ videoId }: { videoId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <section id="Notes">
      <Card>
        <CardHeader>
          <CardTitle>My Notes</CardTitle>
          <CardDescription>
            All your notes at a single place. Click on any note to go to
            specific timestamp in the video.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="flex justify-end">
                <Button variant="outline" className="flex gap-2  w-fit ">
                  <IoMdAddCircleOutline />
                  Add a Note
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[925px]  max-h-screen   ">
              <NotesForm videoId={videoId} setOpen={setOpen} />
            </DialogContent>
          </Dialog>

          <NotesList videoId={videoId} />
        </CardContent>
      </Card>
    </section>
  );
}
