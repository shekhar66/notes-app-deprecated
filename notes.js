const fs = require("fs");
const chalk = require("chalk");

const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.json"));
  } catch (e) {
    return [];
  }
};

const allNotes = loadNotes();

const addNote = (title, body) => {
  const existingNote = checkExistingNote(title);
  if (existingNote) {
    console.log(
      chalk.red.inverse(
        `Note with ${title} is already exists, Try with other title..!!`
      )
    );
  } else {
    const newNote = { title, body };
    allNotes.push(newNote);
    saveNote(allNotes);
    console.log(
      chalk.green.inverse(`Hooray..!!Note with ${title} is created..!!`)
    );
  }
};

const readNote = (title) => {
  const note = checkExistingNote(title);
  if (!note) {
    console.log(chalk.yellow.inverse("Note not found..!!"));
  } else {
    console.log(chalk.white.inverse(`Title is ${chalk.green(note.title)}`));
    console.log(chalk.white.inverse(`Body is ${chalk.green(note.body)}`));
  }
};
const deleteNote = (title) => {
  const note = checkExistingNote(title);
  if (!note) {
    console.log(chalk.yellow.inverse("Note not found..!!"));
  } else {
    const notesToKeep = allNotes.filter((note) => note.title !== title);
    saveNote(notesToKeep);
    console.log(
      chalk.green.inverse(`Hooray..!!Note with ${title} is deleted..!!`)
    );
  }
};
const updateNote = (title, body) => {
  const note = checkExistingNote(title);
  if (!note) {
    console.log(chalk.yellow.inverse("Note not found..!!"));
  } else {
    note.body = body;
    const notesToKeep = allNotes.filter((notes) => notes.title !== title);
    notesToKeep.push(note);
    saveNote(notesToKeep);
    console.log(
      chalk.green.inverse(`Hooray..!!Note with ${title} is updated..!!`)
    );
  }
};
const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.inverse("Your notes"));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const checkExistingNote = (title) => {
  const allNotes = loadNotes();
  const note = allNotes.find((note) => note.title === title);
  return note;
};

const saveNote = (note) => {
  fs.writeFileSync("notes.json", JSON.stringify(note));
};

module.exports = {
  addNote,
  readNote,
  deleteNote,
  updateNote,
  listNotes,
};
