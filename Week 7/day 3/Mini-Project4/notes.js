const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const notesPath = path.join(__dirname, 'notes.json');

const loadNotes = () => {
  try {
    const data = fs.readFileSync(notesPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2));
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const noteExists = _.some(notes, (note) => note.title.toLowerCase() === title.toLowerCase());

  if (noteExists) {
    return false;
  }

  const newNote = { title, body };
  notes.push(newNote);
  saveNotes(notes);
  return newNote;
};

const listNotes = () => loadNotes();

const readNote = (title) => {
  const notes = loadNotes();
  return _.find(notes, (note) => note.title.toLowerCase() === title.toLowerCase());
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = _.filter(notes, (note) => note.title.toLowerCase() !== title.toLowerCase());

  if (filteredNotes.length === notes.length) {
    return false;
  }

  saveNotes(filteredNotes);
  return true;
};

module.exports = {
  addNote,
  listNotes,
  readNote,
  removeNote,
};
