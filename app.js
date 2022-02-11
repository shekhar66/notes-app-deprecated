const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

// Customize yargs version
yargs.version("1.1.0");

// Create The Note
// title and body are mandatory
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// Read The Note
// title is mandatory
yargs.command({
  command: "read",
  describe: "Read the note based on title..!!",
  builder: {
    title: {
      describe: "Read note using title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

// Delete The Note
// title is mandatory
yargs.command({
  command: "delete",
  describe: "Delete the Note based on title..!!",
  builder: {
    title: {
      describe: "delete note using title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.deleteNote(argv.title);
  },
});

// List All The notes
yargs.command({
  command: "list",
  describe: "List All The Notes",
  builder: {},
  handler(argv) {
    notes.listNotes();
  },
});

// Update The notes
yargs.command({
  command: "update",
  describe: "Update the body of note for the specified title",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.updateNote(argv.title, argv.body);
  },
});

yargs.parse();
