export interface NoteType {
  id: string;
  timestamp: number;
  date: string;
  content: string;
}

export interface NotesState {
  [videoId: string]: NoteType[];
}

export type ActionType =
  | { type: "ADD_NOTE"; payload: { videoId: string; note: NoteType } }
  | {
      type: "EDIT_NOTE";
      payload: { videoId: string; noteId: string; content: string };
    }
  | { type: "DELETE_NOTE"; payload: { videoId: string; noteId: string } }
  | { type: "LOAD_NOTES"; payload: NotesState };
