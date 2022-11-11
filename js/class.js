class Note {
  constructor(title, text, bgColor="white", pinned=false, inTrash=false, id=`${Date.now()}${Math.floor(Math.random() * 100000)}`) {
    this.title = title;
    this.text = text;
    this.bgColor = bgColor;
    this.pinned = pinned;
    this.inTrash = inTrash;
    this.id = id;
  }

  changeBgColor(color) {
    this.bgColor = color;
  }

  editNote(title, text) {
    this.title = title;
    this.text = text;
  }

  pinNote() {
    this.pinned = !this.pinned;
  }

  deleteNote() {
    this.inTrash = true;
  }

  restoreNote() {
    this.inTrash = false;
  }

  deleteTotal() {
    notes = notes.filter(note => note.id !== this.id);
  }
}

