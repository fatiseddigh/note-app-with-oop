export default class NotesView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.root.innerHTML = `
      <div class="notes__sidebar">
        <div class="notes__logo">NOTE APP</div>
        <div class="notes__list">
        
        </div>
        <button class="notes__add">ADD NOTE</button>
      </div>
      <div class="notes__preview">
        <input type="text" class="notes__title" placeholder="note title" />
        <textarea name="" class="notes__desc">Takes some notes</textarea>
      </div>
    `;
    const addNoteBtn = this.root.querySelector(".notes__add");
    const inputTitle = this.root.querySelector(".notes__title");
    const inputDesc = this.root.querySelector(".notes__desc");
    addNoteBtn.addEventListener("click", () => {
      this.onNoteAdd();
    });

    [inputTitle, inputDesc].forEach((input) => {
      input.addEventListener("blur", () => {
        const newTitle = inputTitle.value.trim();
        const newDesc = inputDesc.value.trim();
        this.onNoteEdit(newTitle, newDesc);
      });
    });
  }
  _createListItemHtml(id, title, description, updated) {
    const MAX_DESC_LENGTH = 50;
    return `
<div class="notes__list-item" data-note-id="${id}">
            <div class="notes__body-title">${title}</div>
            <div class="notes__body-desc">
            ${description.substring(0, MAX_DESC_LENGTH)}
            ${description.length > MAX_DESC_LENGTH ? "..." : ""}</div>
            <div class="notes__body-update">${new Date(updated).toLocaleString(
              "en",
              {
                dateStyle: "full",
                timeStyle: "short",
              }
            )}</div>
          </div>
`;
  }
  updateNoteList(notes) {
    const notesContainer = this.root.querySelector(".notes__list");
    notesContainer.innerHTML = "";
    let noteList = "";
    for (const note of notes) {
      const { id, title, description, updated } = note;
      const html = this._createListItemHtml(id, title, description, updated);
      noteList += html;
    }
    notesContainer.innerHTML = noteList;
    notesContainer.querySelectorAll(".notes__list-item").forEach((noteItem) => {
      noteItem.addEventListener("click", () =>
        this.onNoteSelect(noteItem.dataset.noteId)
      );
    });
  }
}
