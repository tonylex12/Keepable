class Note {
  constructor(title, text, bgColor="white", pinned=false, inTrash=false) {
    this.title = title;
    this.text = text;
    this.bgColor = bgColor;
    this.pinned = pinned;
    this.inTrash = inTrash;
    this.id = Date.now().toString(36);
  }

  changeBgColor(color) {
    this.bgColor = color;
  }

  changeTitle(title) {
    this.title = title;
  }
  
  changeText(text) {
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
}
