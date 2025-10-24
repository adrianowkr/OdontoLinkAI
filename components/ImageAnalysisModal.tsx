// FIX: Created this file to provide the ImageAnalysisModal component.
import React, { useState } from 'react';
import { analyzeDentalImage } from '../services/geminiService';
import type { MedicalImage } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import PhotoIcon from './icons/PhotoIcon';

interface ImageAnalysisModalProps {
  image: MedicalImage;
  onClose: () => void;
}

const imagePromptStarters = [
    'Verifique a área do dente 36',
    'Há sinais de perda óssea alveolar?',
    'Analise a oclusão na região posterior',
    'Existe alguma anomalia no seio maxilar?'
];

const ImageAnalysisModal: React.FC<ImageAnalysisModalProps> = ({ image, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState('');

  const handleAnalyse = async () => {
    if (!prompt.trim()) return;
    setIsAnalyzing(true);
    setAnalysis('');
    try {
        const result = await analyzeDentalImage(prompt, image.type);
        setAnalysis(result);
    } catch (error) {
        setAnalysis('Ocorreu um erro ao analisar a imagem. Tente novamente.');
    } finally {
        setIsAnalyzing(false);
    }
  };

  const formatAnalysis = (text: string) => {
    return text.split('\n').map((line, index) => {
      const isListItem = line.trim().startsWith('*') || line.trim().startsWith('-');
      const isWarning = line.trim().startsWith('Aviso:');
      const content = isListItem ? line.trim().substring(1).trim() : line;
      
      if (isWarning) {
        return <p key={index} className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">{content}</p>
      }
      if (isListItem) {
          return (
              <li key={index} className="flex items-start">
                  <span className="text-primary-400 mr-2 mt-1">&#8226;</span>
                  <span>{content}</span>
              </li>
          );
      }
      return <p key={index}>{content}</p>;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center">
            <PhotoIcon className="w-6 h-6 text-primary-500" />
            <h2 className="ml-2 text-lg font-bold text-gray-800 dark:text-white">Análise de Imagem com IA</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
            <div className="flex flex-col">
                <p className="font-semibold text-gray-700 dark:text-gray-300">{image.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{image.date}</p>
                <div className="bg-gray-900 rounded-lg flex-1 flex items-center justify-center min-h-[200px]">
                    <img src={image.thumbnailUrl.replace('/200/150', '/800/600').replace('/seed/', '/id/237/')} alt={image.description} className="max-h-full max-w-full object-contain rounded-lg" />
                </div>
            </div>
             <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Solicitação de Análise</h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg flex-1 flex flex-col justify-between">
                   <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Descreva o que você gostaria de analisar nesta imagem..."
                        className="w-full flex-grow bg-transparent border-0 focus:ring-0 resize-none text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 p-0"
                        rows={4}
                    />
                   <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                       <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Sugestões:</p>
                       <div className="flex flex-wrap gap-2">
                           {imagePromptStarters.map((p, i) => (
                               <button key={i} onClick={() => setPrompt(p)} className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full transition-colors">
                                   {p}
                               </button>
                           ))}
                       </div>
                   </div>
                </div>
                 <button onClick={handleAnalyse} disabled={isAnalyzing || !prompt.trim()} className="mt-4 w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {isAnalyzing ? 'Analisando...' : 'Analisar com Dr. Link'}
                </button>
                <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg flex-1 min-h-[150px] overflow-y-auto">
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-2">Resultados da Análise</h4>
                    {isAnalyzing ? (
                        <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                            <SparklesIcon className="w-4 h-4 animate-pulse" />
                            <span>Dr. Link está analisando a imagem...</span>
                        </div>
                    ) : analysis ? (
                        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                            {formatAnalysis(analysis)}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">Os resultados da análise aparecerão aqui.</p>
                    )}
                </div>
            </div>
        </div>
        
        <style>{`
            @keyframes fade-in-scale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in-scale { animation: fade-in-scale 0.3s forwards cubic-bezier(0.16, 1, 0.3, 1); }
        `}</style>
      </div>
    </div>
  );
};

export default ImageAnalysisModal;