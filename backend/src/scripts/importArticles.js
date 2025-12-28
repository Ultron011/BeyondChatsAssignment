import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articlesPath = path.join(__dirname, '..', '..', 'data', 'scraped_articles.json');

const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));

const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO articles (url, title, excerpt, author, publishDate, tags, content)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

for (const article of articles) {
  insertStmt.run(
    article.url,
    article.title,
    article.excerpt,
    article.author,
    article.publishDate,
    JSON.stringify(article.tags),
    article.content
  );
}

console.log(`Imported ${articles.length} articles into database!`);
