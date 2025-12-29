import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const articleService = {
  // Fetch all articles
  getAllArticles: async () => {
    try {
      const response = await api.get('/articles');
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  // Fetch a single article by ID
  getArticleById: async (id) => {
    try {
      const response = await api.get(`/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching article ${id}:`, error);
      throw error;
    }
  },

  // Search articles
  searchArticles: async (query) => {
    try {
      const response = await api.get(`/articles/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching articles:', error);
      throw error;
    }
  },
};

export default api;
