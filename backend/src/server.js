import express from 'express';
import cors from 'cors';
import db from './config/db.js';

const app = express();

// Configure CORS for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'BeyondChats Blog Articles API',
    version: '1.0.0',
    endpoints: {
      'GET /': 'API information',
      'GET /health': 'Health check',
      'GET /articles': 'Get all articles',
      'GET /articles/:id': 'Get single article by ID',
      'POST /articles': 'Create new article',
      'PUT /articles/:id': 'Update article',
      'DELETE /articles/:id': 'Delete article'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET all articles
app.get('/articles', (req, res) => {
  const articles = db.prepare('SELECT * FROM articles').all();
  res.json(articles.map(a => ({ 
    ...a, 
    tags: JSON.parse(a.tags),
    referenceSources: a.referenceSources ? JSON.parse(a.referenceSources) : null,
    isEnhanced: Boolean(a.isEnhanced)
  })));
});

// GET single article by ID
app.get('/articles/:id', (req, res) => {
  const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
  if (!article) return res.status(404).json({ error: 'Article not found' });
  res.json({ 
    ...article, 
    tags: JSON.parse(article.tags),
    referenceSources: article.referenceSources ? JSON.parse(article.referenceSources) : null,
    isEnhanced: Boolean(article.isEnhanced)
  });
});

// POST create new article
app.post('/articles', (req, res) => {
  const { url, title, excerpt, author, publishDate, tags, content } = req.body;
  const stmt = db.prepare(`
    INSERT INTO articles (url, title, excerpt, author, publishDate, tags, content)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(url, title, excerpt, author, publishDate, JSON.stringify(tags), content);
  res.status(201).json({ id: result.lastInsertRowid });
});

// PUT update article
app.put('/articles/:id', (req, res) => {
  const { url, title, excerpt, author, publishDate, tags, content } = req.body;
  const stmt = db.prepare(`
    UPDATE articles
    SET url = ?, title = ?, excerpt = ?, author = ?, publishDate = ?, tags = ?, content = ?
    WHERE id = ?
  `);
  const result = stmt.run(url, title, excerpt, author, publishDate, JSON.stringify(tags), content, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Article not found' });
  res.json({ message: 'Article updated' });
});

// DELETE article
app.delete('/articles/:id', (req, res) => {
  const result = db.prepare('DELETE FROM articles WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Article not found' });
  res.json({ message: 'Article deleted' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on http://localhost:${PORT}`);
});
