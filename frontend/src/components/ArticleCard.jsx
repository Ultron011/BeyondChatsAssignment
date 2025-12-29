import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, User, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cleanArticleContent } from '@/lib/textUtils';

const ArticleCard = ({ article, type = 'original', isPreview = false }) => {
  const navigate = useNavigate();
  const isEnhanced = type === 'enhanced';
  
  const rawContent = isEnhanced 
    ? (article.content || '') 
    : (article.originalContent || article.content || '');
  
  const content = cleanArticleContent(rawContent);

  const handleClick = () => {
    if (isPreview) {
      navigate(`/article/${article.id}`);
    }
  };

  return (
    <Card 
      className={`h-full flex flex-col transition-all duration-300 ${
        isPreview ? 'hover:shadow-md cursor-pointer hover:border-gray-400' : 'shadow-sm'
      }`}
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-xl leading-tight text-gray-800">
            {article.title}
          </CardTitle>
          {isEnhanced && (
            <Badge className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-1 text-xs">
              <Sparkles className="w-3 h-3" />
              Enhanced
            </Badge>
          )}
          {!isEnhanced && !isPreview && (
            <Badge variant="outline" className="text-gray-600 border-gray-300 text-xs">
              Original
            </Badge>
          )}
        </div>
        
        {article.excerpt && (
          <CardDescription className="line-clamp-2 text-gray-600">
            {article.excerpt}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        {!isPreview && content && (
          <div className="text-gray-700 whitespace-pre-wrap break-words overflow-hidden max-w-full">
            {content}
          </div>
        )}

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.slice(0, isPreview ? 3 : 10).map((tag, index) => (
              <Badge key={index} className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">
                {tag}
              </Badge>
            ))}
            {isPreview && article.tags.length > 3 && (
              <Badge className="text-xs bg-gray-100 text-gray-700 border-0">
                +{article.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
        <div className="flex flex-col gap-2">
          {article.author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
          )}
          {article.publishDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.publishDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        {isPreview && (
          <div className="flex items-center gap-1 text-gray-600">
            <span className="text-xs font-medium">View details</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
