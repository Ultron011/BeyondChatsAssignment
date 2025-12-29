import React from "react";
import { Badge } from "./ui/badge";
import { CardContent } from "./ui/card";

const CardContentModal = ({article, isPreview, content}) => {
  return (
    <CardContent className="flex-1 overflow-hidden">
      {!isPreview && content && (
        <div className="text-gray-700 whitespace-pre-wrap break-words overflow-hidden max-w-full">
          {content}
        </div>
      )}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {article.tags.slice(0, isPreview ? 3 : 10).map((tag, index) => (
            <Badge
              key={index}
              className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 border-0"
            >
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
  );
};

export default CardContentModal;
