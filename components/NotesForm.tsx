import { usePlayer } from "@/context/PlayerContext";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { convertImageToBase64 } from "@/utils/imageUtil";
import type { NoteType } from "@/interface/PlayerType";

export default function NotesForm({
  videoId,
  content,
  setOpen,
}: {
  videoId: string;
  content?: NoteType;
  setOpen: (open: boolean) => void;
}) {
  const [quillState, setQuillState] = useState(() => content?.content || "");
  const [imageBase64, setImageBase64] = useState<string | null>(
    () => content?.image || null
  );
  const { handleAddNote, handleEditNote, playerRef } = usePlayer();
  const isAddMode = !content;

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertImageToBase64(file);
        setImageBase64(base64);
      } catch (error) {
        console.error("Error converting image to base64", error);
      }
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newContent = {
      content: quillState,
      id: content?.id || Math.random().toString(),
      // @ts-ignore
      timestamp: playerRef.current?.getCurrentTime(),
      date: content?.date || new Date().toLocaleDateString(),
      image: imageBase64 as string,
    };
    if (isAddMode) handleAddNote(videoId, newContent);
    else handleEditNote(videoId, content.id, newContent);
    setOpen(false);
    setQuillState("");
    setImageBase64(null);
  }
  console.log(isAddMode);

  return (
    <form onSubmit={handleSubmit} className=" space-y-3 mb-4 ">
      <DialogHeader>
        <DialogTitle>Add a Note</DialogTitle>
        <DialogDescription>
          A Note will be added to the video at the current timestamp.
        </DialogDescription>
      </DialogHeader>
      <div className="react-quill-container ">
        <ReactQuill
          value={quillState}
          onChange={setQuillState}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }],
              ["bold", "italic", "underline", "strike"],
              ["clean"],
              [
                {
                  color: ["red", "blue", "yellow"],
                },
              ],
            ],
          }}
          theme="snow"
          placeholder="Enter your note here..."
          className="react-quill-editor w-full   overflow-y-auto"
        />
      </div>
      <div>
        {imageBase64 && (
          <Image src={imageBase64} alt="Preview" width={200} height={200} />
        )}
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  );
}
