//MAIN ENTRY POINT

import express from 'express';
import { ApiError } from './errors';
import { asyncHandler } from './asyncHandler';


const app = express();
const PORT = 3000;

app.use(express.json());

interface Note {
  id: number;
  title: string;
  content: string;
}

//CRUD METHODS

app.get('/notes/:id', (req, res) => {
  const id = Number(req.params.id);

  const note = notes.find(n => n.id === id);

  if (!note) {
    return res.status(404).json({
      error: 'Note not found',
    });
  }

  res.json(note);
});





app.get('/notes', (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const q = (req.query.q as string | undefined)?.toLowerCase();

  let filteredNotes = notes;

  if (q) {
    filteredNotes = notes.filter(note =>
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q)
    );
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedNotes = filteredNotes.slice(start, end);

  res.json({
    page,
    limit,
    total: filteredNotes.length,
    data: paginatedNotes,
  });
});



//REQUEST VALIDATION
app.post('/notes', (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({
      error: 'Title is required',
    });
  }

  const newNote: Note = {
    id: notes.length + 1,
    title,
    content: content || '',
  };

  notes.push(newNote);

  res.status(201).json(newNote);
});


//CENTRALIZED ERRORS
app.put(
  '/notes/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(n => n.id === id);

    if (!note) {
      throw new ApiError(404, 'Note not found');
    }

    res.json(note);
  })
);




app.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = notes.findIndex(n => n.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  notes.splice(index, 1);

  res.status(204).send();
});


app.get('/notes', (req, res) => {
  res.json(notes);
});

const notes: Note[] = [
  { id: 1, title: 'First note', content: 'Hello world' }
];


app.get('/', (req, res) => {
  res.json({ message: 'API is running yeahh!' });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});


import { errorHandler } from './errorMiddleware';

app.use(errorHandler);
