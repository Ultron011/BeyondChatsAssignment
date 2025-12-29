import React from "react";
import {CardHeader, CardTitle, CardDescription} from './ui/card'
import { Badge, Sparkles } from "lucide-react";

const CardHeaderModal = ({article, isEnhanced, isPreview}) => {
  return (
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
          <Badge
            variant="outline"
            className="text-gray-600 border-gray-300 text-xs"
          >
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
  );
};

export default CardHeaderModal;
