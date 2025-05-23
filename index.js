import express from 'express';
import cors from 'cors';
// import proverbsRouter from './routes/proverbs.js';
import { loadProverbs, saveProverbs } from '../utils/fileHelper.js';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
// app.use('/api/proverbs', proverbsRouter);
app.get('/', (req, res) => {
  res.send('API is live ✅');
});
//  GET Original Proverbs
app.get('/api/proverbs/:language/original', (req, res) => {
  const language = req.params.language;
  const originalData = loadProverbs(language, false); //
  res.json(originalData); // Return the original proverbs
});

// Route to get all proverbs
// @route GET /api/proverbs/:language

app.get('/api/proverbs/:language', (req, res) => {
  const language = req.params.language;
  const proverbs = loadProverbs(language); // dari-user or pashto-user
  res.json(proverbs);
});

//  GET a single proverb by ID
// @route GET /api/proverbs/:language/:id

app.get('/api/proverbs/:language/:id', (req, res) => {
  const language = req.params.language;
  const id = parseInt(req.params.id);
  const data = loadProverbs(language);
  const proverb = data.find((p) => p.id === id);

  if (!proverb) return res.status(404).json({ message: 'Proverb not found' });
  res.json(proverb);
});

//  POST a new proverb
// @route POST /api/proverbs/:language
app.post('/api/proverbs/:language', (req, res) => {
  const language = req.params.language;
  const data = loadProverbs(language);

  const newProverb = req.body;

  // Generate a new unique ID
  const newId = data.length ? Math.max(...data.map((p) => p.id)) + 1 : 1;
  newProverb.id = newId;

  data.push(newProverb);
  saveProverbs(language, data);
  res.status(201).json(newProverb);
});

// PUT (Update) a proverb by ID
// @route PUT /api/proverbs/:language/:id
app.put('/api/proverbs/:language/:id', (req, res) => {
  const language = req.params.language;
  const id = parseInt(req.params.id);
  const data = loadProverbs(language);

  const index = data.findIndex((p) => p.id === id);
  if (index === -1)
    return res.status(404).json({ message: 'Proverb not found' });

  // Merge updated fields
  const updatedProverb = { ...data[index], ...req.body, id };
  data[index] = updatedProverb;

  saveProverbs(language, data);
  res.json(updatedProverb);
});

// DELETE a proverb by ID
// @route DELETE /api/proverbs/:language/:id
app.delete('/api/proverbs/:language/:id', (req, res) => {
  const language = req.params.language;
  const id = parseInt(req.params.id);
  const data = loadProverbs(language);

  const index = data.findIndex((p) => p.id === id);
  if (index === -1)
    return res.status(404).json({ message: 'Proverb not found' });

  data.splice(index, 1);
  saveProverbs(language, data);

  res.json({ message: `Proverb with id ${id} deleted.` });
});

// Reset User Proverbs (copy original data to user file)
app.post('/api/proverbs/:language/reset', (req, res) => {
  const language = req.params.language;

  const originalData = loadProverbs(language, false);
  saveProverbs(language, originalData);
  res.json({
    message: `${language}-user.json has been reset to the original.`,
  });
});
// app.use('/api/posts', posts);
// // Error Handling Middleware
// app.use(notFound);
// app.use(errorHandler);
app.listen(port, () => console.log(`Server is running on port ${port}`));
