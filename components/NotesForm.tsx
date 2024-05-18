import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
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
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { convertImageToBase64 } from "@/utils/imageUtil";
import type { NoteType } from "@/interface/PlayerType";

interface NotesFormProps {
  videoId: string;
  content?: NoteType;
  setOpen: (open: boolean) => void;
}

const initialState: NoteType = {
  content: "",
  id: "",
  timestamp: 0,
  date: "",
  image: "",
};

// This component is used to display the form to add or edit a note
export default function NotesForm({
  videoId,
  content,
  setOpen,
}: NotesFormProps) {
  const [formState, setFormState] = useState<NoteType>(content || initialState);
  const { handleAddNote, handleEditNote, playerRef } = usePlayer();

  const isAddMode = !content;

  // This function is called when the user types in the editor
  function handleQuillChange(content: string) {
    setFormState((prev) => ({ ...prev, content }));
  }
  // This function is called when the user uploads an image
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertImageToBase64(file);
        setFormState((prev) => ({ ...prev, image: base64 }));
      } catch (error) {
        console.error("Error converting image to base64", error);
      }
    }
  }
  // This function is called when the user submits the form
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newContent = {
      ...formState,
      date: formState.date ? formState.date : new Date().toLocaleDateString(),
      id: content?.id || Math.random().toString(36).substr(2, 9),

      timestamp:
        // @ts-ignore
        formState.timestamp || playerRef.current?.getCurrentTime() || 0,
    };

    if (isAddMode) {
      handleAddNote(videoId, newContent);
    } else {
      handleEditNote(videoId, content.id, newContent);
    }
    setOpen(false);
    setFormState(initialState);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-4">
      <DialogHeader>
        <DialogTitle>{isAddMode ? "Add a Note" : "Edit Note"}</DialogTitle>
        <DialogDescription>
          A Note will be added to the video at the current timestamp.
        </DialogDescription>
      </DialogHeader>
      <div className="react-quill-container bg-red-200">
        <ReactQuill
          value={formState.content}
          onChange={handleQuillChange}
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              ["clean"],
              [{ color: ["red", "blue", "yellow"] }],
            ],
          }}
          theme="snow"
          placeholder="Enter your note here..."
          className="react-quill-editor   overflow-y-auto"
        />
      </div>
      <div>
        {formState.image && (
          <Image src={formState.image} alt="Preview" width={200} height={200} />
        )}
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  );
}
