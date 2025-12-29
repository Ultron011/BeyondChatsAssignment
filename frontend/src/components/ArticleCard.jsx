import { Card } from './ui/card';
import { useNavigate } from 'react-router-dom';
import { cleanArticleContent } from '@/lib/textUtils';
import CardHeaderModal from './CardHeaderModal';
import CardContentModal from './CardContentModal';
import CardFooterModal from './CardFooterModal';

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
      <CardHeaderModal article={article} isEnhanced={isEnhanced} isPreview={isPreview} />

      <CardContentModal article={article} isPreview={isPreview} content={content} />

      <CardFooterModal article={article} isPreview={isPreview} />
    </Card>
  );
};

export default ArticleCard;
