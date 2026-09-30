const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const _ = require('lodash');
const notes = require('./notes');

const parser = yargs(hideBin(process.argv));

parser.command({
  command: 'add',
  describe: 'Add a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    const added = notes.addNote(argv.title, argv.body);

    if (!added) {
      console.log('Note already exists');
      return;
    }

    console.log('Note added successfully');
    console.log(`Title: ${added.title}`);
    console.log(`Body: ${added.body}`);
  },
});

parser.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    const allNotes = notes.listNotes();

    if (!allNotes.length) {
      console.log('No notes saved yet');
      return;
    }

    console.log('Your notes:');
    allNotes.forEach((note) => {
      console.log(`- ${note.title}`);
    });
  },
});

parser.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Title of the note to read',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    const foundNote = notes.readNote(argv.title);

    if (!foundNote) {
      console.log('Note not found');
      return;
    }

    console.log(`Title: ${foundNote.title}`);
    console.log(`Body: ${foundNote.body}`);
  },
});

parser.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Title of the note to remove',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    const removed = notes.removeNote(argv.title);

    if (!removed) {
      console.log('Note not found');
      return;
    }

    console.log('Note removed successfully');
  },
});

parser.demandCommand(1, 'command not recognized');
parser.help();
parser.parse();
