
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  showAiInsight?: boolean;
}

const Card: React.FC<CardProps> = ({ title, children, className, showAiInsight = false }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${className}`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
          {showAiInsight && (
            <div className="group relative">
              <button className="flex items-center text-xs text-primary-500 dark:text-primary-400 font-semibold bg-primary-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                <SparklesIcon className="w-4 h-4 mr-1" />
                <span>Insight</span>
              </button>
               <div className="absolute bottom-full mb-2 w-48 bg-gray-900 text-white text-xs rounded py-2 px-3 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                AI: 85% dos procedimentos de hoje são de rotina, considere delegar preparações para otimizar seu tempo.
                <svg className="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
              </div>
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Card;
