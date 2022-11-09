// Function to create Notes

const createNote = () => {
  let title = document.getElementById('titleNote').value;
  let text = document.getElementById('textNote').value;
  let note = new Note(title, text, colorBg);
  notes.push(note);
  document.getElementById('titleNote').value = '';
  document.getElementById('textNote').value = '';
  renderNotes(notesContainer);
} 

const renderNotes = (container) => {
  if (notes.some(note => note.inTrash === false)) {
    document.getElementById('notesTitle').innerHTML = `<h1>Your Notes</h1>`;
  } else {
    document.getElementById('notesTitle').innerHTML = `<h1>There are no notes</h1>`;
  }

  document.getElementsByClassName('form-maker')[0].style.display = 'flex';

  container.innerHTML = '';
  notes.filter(note => note.inTrash === false).forEach(note => {
    container.innerHTML += `<div class="card-header" style="background-color: ${note.bgColor}">
                              <div class="pin">
                                <i class="ri-pushpin-2-fill pinBtn" id="${note.id}"></i>
                              </div>
                              <div class="card-header__title">
                                <h3>${note.title}</h3>
                              </div>
                              <div class="card-header__text">
                                <p>${note.text}</p>
                              </div>
                              <div class="card-header__buttons">
                                <span onclick="showPalette('${note.bgColor}${note.id}')"><i class="ri-palette-fill ri-2x"></i>
                                </span>
                                <span class="card-header__button card-header__button--delete">
                                  <i class="ri-delete-bin-line ri-2x deleteBtn" id="${note.id}"></i>
                                </span>
                              </div>
                              <div class="palette" id="${note.bgColor}${note.id}">
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

  // Add event listener to each pin button
  let pinButtons = document.getElementsByClassName('pinBtn');
  for (let i = 0; i < pinButtons.length; i++) {
    pinButtons[i].addEventListener('click', pinNote);
  }

  localStorage.setItem('notesLS', JSON.stringify(notes));
}

const renderPinnedNotes = (container) => {
  if (notes.some(note => note.pinned === true)) {
    document.getElementById('pinnedNotesTitle').innerHTML = `<h1>Pinned Notes</h1>`;
  } else {
    document.getElementById('pinnedNotesTitle').innerHTML = "";
  }

  container.innerHTML = '';
  notes.filter(note => note.pinned === true).forEach(note => {
    container.innerHTML += `<div class="card-header" style="background-color: ${note.bgColor}">
                              <div class="pin">
                                <i class="ri-pushpin-2-fill pinBtn" id="${note.id}"></i>
                              </div>
                              <div class="card-header__title">
                                <h3>${note.title}</h3>
                              </div>
                              <div class="card-header__text">
                                <p>${note.text}</p>
                              </div>
                              <div class="card-header__buttons">
                                <span onclick="showPalette('${note.bgColor}${note.id}')"><i class="ri-palette-fill ri-2x"></i>
                                </span>
                                <span class="card-header__button card-header__button--delete">
                                  <i class="ri-delete-bin-line ri-2x deleteBtn" id="${note.id}"></i>
                                </span>
                              </div>
                              <div class="palette" id="${note.bgColor}${note.id}">
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

  // Add event listener to each pin button
  let pinButtons = document.getElementsByClassName('pinBtn');
  for (let i = 0; i < pinButtons.length; i++) {
    pinButtons[i].addEventListener('click', pinNote);
  }

  localStorage.setItem('notesLS', JSON.stringify(notes));
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

const pinNote = (e) => {
  const idNote = e.target.id;
  notes.forEach(note => {
    if (note.id === idNote) {
      note.pinNote();
    }
  })
  localStorage.setItem('notesLS', JSON.stringify(notes));
  renderPinnedNotes(pinnedNotesContainer);
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
  localStorage.setItem('notesLS', JSON.stringify(notes));
  renderNotes(notesContainer);

}

const deleteNote = (e) => {
  const idNote = e.target.id;
  notes.forEach(note => {
    if (note.id === idNote) {
      note.deleteNote();
    }
  })
  localStorage.setItem('notesLS', JSON.stringify(notes));
  renderNotes(notesContainer);
}

const renderTrash = (container) => {
  if (notes.some(note => note.inTrash === true)) {
    document.getElementById('notesTitle').innerHTML = `<h1>Trash</h1>`;
  } else {
    document.getElementById('notesTitle').innerHTML = `<h1>Trash is empty</h1>`;
  }

  document.getElementsByClassName('form-maker')[0].style.display = 'none';
  document.getElementById('pinnedNotesContainer').style.display = 'none';

  container.innerHTML = '';
  notes.filter(note => note.inTrash === true).forEach(note => {
    container.innerHTML += `<div class="card-header" style="background-color: ${note.bgColor}">
                              <div class="card-header__title">
                                <h3>${note.title}</h3>
                              </div>
                              <div class="card-header__text">
                                <p>${note.text}</p>
                              </div>
                              <div class="card-header__buttons">
                                <span class="card-header__button card-header__button--restore">
                                  <i class="ri-refresh-line ri-2x restoreBtn" id="${note.id}"></i>
                                </span>
                                <span class="card-header__button card-header__button--delete">
                                  <i class="ri-delete-bin-line ri-2x deleteTotalBtn" id="${note.id}"></i>
                                </span>
                              </div>
                            </div>`
  })

  // Add event listener to each restore button
  let restoreButtons = document.getElementsByClassName('restoreBtn');
  for (let i = 0; i < restoreButtons.length; i++) {
    restoreButtons[i].addEventListener('click', restoreNote);
  }
  
  // Add event listener to each delete button
  let deleteTotalButtons = document.getElementsByClassName('deleteTotalBtn');
  for (let i = 0; i < deleteTotalButtons.length; i++) {
    deleteTotalButtons[i].addEventListener('click', deleteTotal);
  }
  localStorage.setItem('notesLS', JSON.stringify(notes));
}


const restoreNote = (e) => {
  const idNote = e.target.id;
  notes.forEach(note => {
    if (note.id === idNote) {
      note.restoreNote();
    }
  })
  localStorage.setItem('notesLS', JSON.stringify(notes));
  renderTrash(notesContainer);
}

const deleteTotal = (e) => {
  const idNote = e.target.id;
  notes.forEach(note => {
    if (note.id === idNote) {
      note.deleteTotal();
    }
  })
  localStorage.setItem('notesLS', JSON.stringify(notes));
  renderTrash(notesContainer);
}