import { NotesApi } from "./NotesApi.js";
import NotesView from "./NotesView.js";
const app = document.getElementById("app");
const view = new NotesView(app, {
  onNoteAdd() {
    console.log("adddd");
  },
  onNoteEdit(title, desc) {
    console.log(title, desc);
  },
  onNoteSelect(noteId) {
    console.log(noteId);
  },
});
view.updateNoteList(NotesApi.getAllNotes());
