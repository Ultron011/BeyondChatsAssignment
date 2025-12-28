import { getJson } from 'serpapi';
import dotenv from 'dotenv';

dotenv.config();

export async function searchGoogle(query) {
  const params = {
    api_key: process.env.SERPAPI_KEY,
    q: query,
    num: 10
  };

  const response = await getJson('google', params);
  const organicResults = response.organic_results || [];

  // Filter for blog/article URLs (exclude social media, video, PDFs, etc.)
  const blogResults = organicResults.filter(result => {
    const url = result.link.toLowerCase();
    const excludePatterns = ['youtube.com', 'facebook.com', 'twitter.com', 'instagram.com', 
                             'linkedin.com', 'pinterest.com', '.pdf', 'reddit.com'];
    return !excludePatterns.some(pattern => url.includes(pattern));
  });

  // Return top 2 blog articles
  return blogResults.slice(0, 2).map(result => ({
    title: result.title,
    url: result.link,
    snippet: result.snippet
  }));
}
