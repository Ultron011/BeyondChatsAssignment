import Firecrawl from '@mendable/firecrawl-js';
import dotenv from 'dotenv';

dotenv.config();

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function scrapeArticleContent(url) {
  try {
    console.log(`Scraping content from: ${url}`);
    const result = await firecrawl.scrape(url, { formats: ['markdown'] });
    return result.markdown;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  }
}
