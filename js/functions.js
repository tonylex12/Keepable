// Function to create Notes

const createNote = () => {
  let title = document.getElementById('titleNote').value;
  let text = document.getElementById('textNote').value;
  let noteContainer = document.getElementById('notesContainer');
  let note = new Note(title, text, colorBg);
  // let note = new Note(title, text);
  notes.push(note);
  document.getElementById('titleNote').value = '';
  document.getElementById('textNote').value = '';
  renderNotes(noteContainer);
} 

const renderNotes = (container) => {
  if (notes.length > 0) {
    document.getElementById('notesTitle').innerHTML = `<h1>Your Notes</h1>`;
  }
  container.innerHTML = '';
  notes.forEach(note => {
    container.innerHTML += `<div class="card-header" style="background-color: ${note.bgColor}">
                              <div class="card-header__title">
                                <h3>${note.title}</h3>
                              </div>
                              <div class="card-header__text">
                                <p>${note.text}</p>
                              </div>
                              <div class="card-header__buttons">
                                <span><i class="ri-palette-fill ri-2x"></i>
                                </span>
                                <span class="card-header__button card-header__button--delete" onclick="deleteNote()">
                                  <i class="ri-delete-bin-line ri-2x"></i>
                                </span>
                              </div>
                            </div>`
  })
}

const showPalette = () => {
  let palette = document.getElementById('palette')
  if (palette.style.opacity === '0') {
    palette.style.opacity = '1';
  } else {
    palette.style.opacity = '0';
  }
}

const changeColor = (color) => {
  let note = document.getElementsByClassName('form-maker')[0];
  note.style.backgroundColor = color;
  colorBg = color;
}