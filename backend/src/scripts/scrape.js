import Firecrawl from '@mendable/firecrawl-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

async function extractArticleData(html) {
  const $ = cheerio.load(html);
  const articles = [];
  
  $('.entry-card').each((_, card) => {
    const url = $(card).find('.entry-title a').attr('href');
    if (!url) return;
    
    const tags = [];
    $(card).find('.card-content .meta-categories a[rel="tag"]').each((_, tag) => {
      tags.push($(tag).text().trim());
    });
    
    const title = $(card).find('.entry-title a').text().trim();
    const excerpt = $(card).find('.entry-excerpt p').text().trim();
    const author = $(card).find('.meta-author a[rel="author"] span').text().trim();
    const publishDate = $(card).find('.meta-date time').attr('datetime') || '';
    
    articles.push({ url, tags, title, excerpt, author, publishDate });
  });
  
  return articles;
}

async function scrapePageLinks(pageNum) {
  console.log(`Fetching page ${pageNum}...`);
  const result = await firecrawl.scrape(`https://beyondchats.com/blogs/page/${pageNum}/`, { formats: ['html'] });
  const articles = await extractArticleData(result.html);
  console.log(`Found ${articles.length} articles on page ${pageNum}`);
  return articles;
}

async function scrapeArticle(articleData) {
  console.log(`Scraping: ${articleData.url}`);
  const result = await firecrawl.scrape(articleData.url, { formats: ['markdown'] });
  
  const content = result.markdown;
  
  return { 
    url: articleData.url,
    title: articleData.title,
    excerpt: articleData.excerpt,
    author: articleData.author,
    publishDate: articleData.publishDate,
    tags: articleData.tags,
    content
  };
}

async function main() {
  const page15 = await scrapePageLinks(15);
  const page14 = await scrapePageLinks(14);
  
  const oldest5 = [...page15, ...page14.slice(-4)];
  console.log(`\nScraping the 5 oldest articles...`);
  
  const articles = [];
  for (const articleData of oldest5) {
    const article = await scrapeArticle(articleData);
    articles.push(article);
  }
  
  const outputPath = path.join(__dirname, '..', '..', 'data', 'scraped_articles.json');
  fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2));
  console.log(`\nScraped ${articles.length} articles successfully!`);
}

main().catch(console.error);
