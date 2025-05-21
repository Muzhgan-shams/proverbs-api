import express from 'express';
import cors from 'cors';
import proverbsRouter from './routes/proverbs.js';
console.log('Server booting…');
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
app.use('/api/proverbs', proverbsRouter);
app.get('/', (req, res) => {
  res.send('API is live ✅');
});

// app.use('/api/posts', posts);
// // Error Handling Middleware
// app.use(notFound);
// app.use(errorHandler);
app.listen(port, () => console.log(`Server is running on port ${port}`));
