export interface NoteType {
  id: string;
  timestamp: number;
  date: string;
  image?: string;
  content: string;
}

export interface NotesState {
  [videoId: string]: NoteType[];
}

export type ActionType =
  | {
      type: "ADD_NOTE";
      payload: { videoId: string; note: NoteType; image?: string };
    }
  | {
      type: "EDIT_NOTE";
      payload: { videoId: string; noteId: string; note: NoteType };
    }
  | { type: "DELETE_NOTE"; payload: { videoId: string; noteId: string } }
  | { type: "LOAD_NOTES"; payload: NotesState };
