let notes = [];
let colorBg = '#fff';

const notesContainer = document.getElementById('notesContainer');

const notesFromLocalStorage = JSON.parse(localStorage.getItem('notesLS'));

// If there are notes in localStorage, render them
if (notesFromLocalStorage) {
  const notesLS = notesFromLocalStorage;
  notesLS.forEach(note => {
    notes.push(note = new Note(note.title, note.text, note.bgColor, note.pinned, note.inTrash));
  })
  renderNotes(notesContainer);
}
