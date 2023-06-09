import { NotesApi } from "./NotesApi.js";
import NotesView from "./NotesView.js";
export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());
    this._refreshNotes();
  }
  _refreshNotes() {
    //set notes
    const notes = NotesApi.getAllNotes();
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
    //set active note
    this.activeNote = notes[0];
    this.view.updateActiveNote(notes[0]);
  }
  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: "new note",
          description: "dessss",
        };
        NotesApi.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (title, desc) => {
        NotesApi.saveNote({
          id: this.activeNote.id,
          title: title,
          description: desc,
        });
        this._refreshNotes();
      },
      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find((n) => n.id == noteId);
        this.activeNote = selectedNote;
        this.view.updateActiveNote(selectedNote);
      },
      onNoteDelete: (noteId) => {
        NotesApi.deleteNote(noteId);
        this._refreshNotes();
      },
    };
  }
}
