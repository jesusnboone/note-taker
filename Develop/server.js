// Dependencies
// =============================================================
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = require('../Develop/db/db.json')


// Routes
// =============================================================

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  return res.json(notes);
});

app.get('/api/notes/:character', (req, res) => {
  const chosen = req.params.character;

  console.log(chosen);

  for (let i = 0; i < notes.length; i++) {
    if (chosen === notes[i].routeName) {
      return res.json(notes[i]);
    }
  }

  return res.json(false);
});

app.post('/api/notes', (req, res) => {
  const newCharacter = req.body;

  // BONUS: Use a RegEx Pattern to remove spaces from newCharacter
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, '').toLowerCase();

  console.log(newCharacter);

  notes.push(newCharacter);

  res.json(newCharacter);
});

// Listener
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
