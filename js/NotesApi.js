const notes = [
  {
    id: 1,
    title: "first note",
    description: " some text here",
    updated: "2023-06-08T15:30:06.707Z",
  },
  {
    id: 2,
    title: "second note",
    description: " some text here",
    updated: "2023-04-08T15:30:06.707Z",
  },
];
export class NotesApi {
  static getAllNotes() {
    const savedNotes =
      // JSON.parse(localStorage.getItem("all-note"))
      notes || [];
    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(a.updated) ? -1 : 1;
    });
  }
  static saveNote(savedNote) {
    //check exited or create new
    const notes = NotesApi.getAllNotes();
    const exitedNote = notes.find((n) => n.id === savedNote.id);
    if (exitedNote) {
      exitedNote.title = savedNote.title;
      exitedNote.description = savedNote.description;
      exitedNote.updated = new Date().toISOString();
    } else {
      savedNote.id = new Date().getTime();
      savedNote.updated = new Date().toISOString();
      notes.push(savedNote);
    }
    localStorage.setItem("note-app", JSON.stringify(notes));
  }
  static deleteNote(id) {
    const notes = NotesApi.getAllNotes();
    const filteredNotes = notes.filter((n) => n.id != id);
    localStorage.setItem("note-app", JSON.stringify(filteredNotes));
  }
}
