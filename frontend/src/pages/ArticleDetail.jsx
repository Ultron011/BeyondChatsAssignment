import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { articleService } from '@/services/api';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await articleService.getArticleById(id);
        setArticle(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        <span className="ml-3 text-gray-600">Loading article...</span>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-600 font-medium">{error || 'Article not found'}</p>
          <Button 
            onClick={() => navigate('/')} 
            className="mt-4 bg-gray-600 hover:bg-gray-700"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          onClick={() => navigate('/')} 
          variant="outline"
          className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Button>
      </div>

      <div className="space-y-4">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>
          {article.excerpt && (
            <p className="text-gray-600 mt-2">{article.excerpt}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Article */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              Original Version
            </h3>
            <ArticleCard article={article} type="original" />
          </div>

          {/* Enhanced Article */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Enhanced Version
            </h3>
            {article.isEnhanced ? (
              <ArticleCard article={article} type="enhanced" />
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 bg-gray-50">
                <div className="text-center">
                  <p className="text-gray-500 text-lg mb-2">
                    This article hasn't been enhanced yet.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Only the original content is available.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
