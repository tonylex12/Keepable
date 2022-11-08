// Function to create Notes

const createNote = () => {
  let title = document.getElementById('titleNote').value;
  let text = document.getElementById('textNote').value;
  let note = new Note(title, text, colorBg);
  notes.push(note);
  document.getElementById('titleNote').value = '';
  document.getElementById('textNote').value = '';
  renderNotes(noteContainer);
} 

const renderNotes = (container) => {
  if (notes.some(note => note.inTrash === false)) {
    document.getElementById('notesTitle').innerHTML = `<h1>Your Notes</h1>`;
  } else {
    document.getElementById('notesTitle').innerHTML = `<h1>There are no notes</h1>`;
  }
  container.innerHTML = '';
  notes.filter(note => note.inTrash === false).forEach(note => {
    container.innerHTML += `<div class="card-header" style="background-color: ${note.bgColor}">
                              <div class="card-header__title">
                                <h3>${note.title}</h3>
                              </div>
                              <div class="card-header__text">
                                <p>${note.text}</p>
                              </div>
                              <div class="card-header__buttons">
                                <span onclick="showPalette('palette2')"><i class="ri-palette-fill ri-2x"></i>
                                </span>
                                <span class="card-header__button card-header__button--delete">
                                  <i class="ri-delete-bin-line ri-2x deleteBtn" id="${note.id}"></i>
                                </span>
                              </div>
                              <div class="palette" id="palette2">
                                <button class="colorBtn #fff" id="${note.id}" style="background-color: #fff"></button>
                                <button class="colorBtn #f28b82" id="${note.id}" style="background-color: #f28b82"></button>
                                <button class="colorBtn #fbbc04" id="${note.id}" style="background-color: #fbbc04"></button>  
                                <button class="colorBtn #ccff90" id="${note.id}" style="background-color: #ccff90"></button>
                                <button class="colorBtn #a7ffeb" id="${note.id}" style="background-color: #a7ffeb"></button>
                                <button class="colorBtn #aecbfa" id="${note.id}" style="background-color: #aecbfa"></button>
                                <button class="colorBtn #d7aefb" id="${note.id}" style="background-color: #d7aefb"></button>
                                <button class="colorBtn #fdcfe8" id="${note.id}" style="background-color: #fdcfe8"></button>
                              </div>
                            </div>`
  })
  // Add event listener to each button
  let buttons = document.getElementsByClassName('colorBtn');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', changeBgColor);
  }

  // Add event listener to each delete button
  let deleteButtons = document.getElementsByClassName('deleteBtn');
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', deleteNote);
  }
}

const showPalette = (id) => {
  let palette = document.getElementById(id)
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
  showPalette('palette');
}

const changeBgColor = (e) => {
  const idNote = e.target.id;
  const color = e.target.classList[1];
  // CHANGE BG COLOR OF THE NOTE
  notes.forEach(note => {
    if (note.id === idNote) {
      note.changeBgColor(color);
    }
  })
  // RENDER NOTES
  renderNotes(noteContainer);
}

const deleteNote = (e) => {
  const idNote = e.target.id;
  notes.forEach(note => {
    if (note.id === idNote) {
      note.deleteNote();
    }
  })
  renderNotes(noteContainer);
}