import { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { articleService } from '@/services/api';
import { Loader2, AlertCircle } from 'lucide-react';

const ArticleGrid = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await articleService.getAllArticles();
        setArticles(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please make sure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        <span className="ml-3 text-gray-600">Loading articles...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-600 font-medium">{error}</p>
          <p className="text-gray-600 text-sm mt-2">
            Make sure your backend is running at http://localhost:3000
          </p>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">No articles found.</p>
        <p className="text-gray-500 text-sm mt-2">
          Import some articles to get started!
        </p>
      </div>
    );
  }

  // Show only first 5 articles as preview cards
  const previewArticles = articles.slice(0, 5);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Recent Articles</h2>
        <p className="text-gray-600 mt-1">Click on any article to view original and enhanced versions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {previewArticles.map((article) => (
          <ArticleCard key={article.id} article={article} isPreview={true} />
        ))}
      </div>
      
      {articles.length > 5 && (
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Showing 5 of {articles.length} articles
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticleGrid;
