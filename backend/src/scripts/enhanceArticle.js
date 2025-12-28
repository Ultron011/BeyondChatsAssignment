import db from '../config/db.js';
import { searchGoogle } from '../services/googleSearch.js';
import { scrapeArticleContent } from '../services/contentScraper.js';
import { enhanceArticle } from '../services/llmService.js';

async function enhanceSingleArticle(articleId) {
  try {
    console.log(`\nProcessing article ID: ${articleId}`);
    console.log('='.repeat(80));
    
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(articleId);
    
    if (!article) {
      console.error('Error: Article not found');
      return false;
    }
    
    if (article.isEnhanced) {
      console.log('Article already enhanced. Skipping...');
      return false;
    }
    
    console.log(`Article: "${article.title}"`);
    console.log('\nSearching Google...');
    const searchResults = await searchGoogle(article.title);
    
    if (searchResults.length === 0) {
      console.log('No search results found. Skipping...');
      return false;
    }
    
    console.log(`Found ${searchResults.length} reference articles:`);
    searchResults.forEach((r, i) => console.log(`  ${i + 1}. ${r.title}`));
    
    console.log('\nScraping reference articles...');
    const referenceArticles = [];
    for (const result of searchResults) {
      try {
        const content = await scrapeArticleContent(result.url);
        if (content) {
          referenceArticles.push({ ...result, content });
          console.log(`  Scraped: ${result.title}`);
        }
      } catch (error) {
        console.log(`  Failed: ${result.title}`);
      }
    }
    
    if (referenceArticles.length === 0) {
      console.error('Error: Failed to scrape any reference articles');
      return false;
    }
    
    console.log(`\nEnhancing with AI (${referenceArticles.length} references)...`);
    const enhancedContent = await enhanceArticle(
      { title: article.title, content: article.originalContent },
      referenceArticles
    );
    console.log('Enhanced successfully');
    
    console.log('\nUpdating database...');
    const referenceSources = JSON.stringify(
      referenceArticles.map(r => ({ title: r.title, url: r.url }))
    );
    
    const updateStmt = db.prepare(`
      UPDATE articles
      SET content = ?, isEnhanced = 1, referenceSources = ?, enhancedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    updateStmt.run(enhancedContent, referenceSources, articleId);
    console.log('Database updated');
    console.log(`\nEnhancement complete for article #${articleId}`);
    
    return true;
  } catch (error) {
    console.error(`Error enhancing article #${articleId}:`, error.message);
    return false;
  }
}

async function enhanceAllArticles() {
  try {
    const articles = db.prepare('SELECT * FROM articles WHERE isEnhanced = 0').all();
    
    if (articles.length === 0) {
      console.log('No articles to enhance. All are already enhanced.');
      return;
    }

    console.log(`\nFound ${articles.length} articles to enhance\n`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      console.log(`\n[${ i + 1}/${articles.length}] Processing: "${article.title}"`);
      
      const success = await enhanceSingleArticle(article.id);
      
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
      
      if (i < articles.length - 1) {
        console.log('\nWaiting 2 seconds...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log('All articles processed');
    console.log(`\nSummary: ${successCount} enhanced, ${failCount} failed/skipped`);

  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

const arg = process.argv[2];

if (!arg) {
  console.log('\nUsage:');
  console.log('  node enhanceArticle.js <id>    - Enhance specific article');
  console.log('  node enhanceArticle.js all     - Enhance all articles\n');
  process.exit(0);
}

if (arg.toLowerCase() === 'all') {
  enhanceAllArticles();
} else {
  const articleId = parseInt(arg);
  if (isNaN(articleId)) {
    console.error('Error: Invalid article ID. Provide a number or "all"');
    process.exit(1);
  }
  enhanceSingleArticle(articleId);
}
