"use client";
import { usePlayer } from "@/context/PlayerContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NotesBox from "./NotesList";

export default function Notes({ videoId }: { videoId: string }) {
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
          <NotesBox videoId={videoId} />
        </CardContent>
      </Card>
    </section>
  );
}
