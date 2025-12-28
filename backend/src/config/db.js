import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', '..', 'data', 'articles.db');

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    author TEXT,
    publishDate TEXT,
    tags TEXT,
    originalContent TEXT,
    content TEXT,
    isEnhanced INTEGER DEFAULT 0,
    referenceSources TEXT,
    enhancedAt DATETIME,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
