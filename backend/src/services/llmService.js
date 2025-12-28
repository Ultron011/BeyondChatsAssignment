import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function enhanceArticle(originalArticle, referenceArticles) {
  const prompt = `You are a content enhancement expert. Your task is to rewrite and improve an article based on top-ranking reference articles.

ORIGINAL ARTICLE:
Title: ${originalArticle.title}
Content:
${originalArticle.content}

REFERENCE ARTICLES (Top Google Results):
${referenceArticles.map((ref, i) => `
Reference ${i + 1}: ${ref.title}
URL: ${ref.url}
Content:
${ref.content}
`).join('\n---\n')}

INSTRUCTIONS:
1. Analyze the formatting, structure, and style of the reference articles
2. Rewrite the original article to match the quality and structure of top-ranking articles
3. Improve content depth, readability, and SEO optimization
4. Keep the original message and key points
5. Add relevant insights from reference articles where appropriate
6. At the end, add a "References" section citing both reference articles with their titles and URLs

OUTPUT:
Return ONLY the enhanced article content in markdown format, including the references section at the bottom.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 4000
  });

  return response.choices[0].message.content;
}
