import React from "react";
import { Calendar, User, ArrowRight } from 'lucide-react';
import { CardFooter } from "./ui/card";

const CardFooterModal = ({article, isPreview}) => {
  return (
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
  );
};

export default CardFooterModal;
