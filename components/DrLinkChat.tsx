import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import StethoscopeIcon from './icons/StethoscopeIcon';
import WrenchScrewdriverIcon from './icons/WrenchScrewdriverIcon';
import ClipboardDocumentCheckIcon from './icons/ClipboardDocumentCheckIcon';
import { getDrLinkResponse } from '../services/geminiService';

interface DrLinkChatProps {
  onClose: () => void;
}

type AiMode = 'clinical' | 'technical' | 'admin';

const modeConfig = {
    clinical: {
        icon: StethoscopeIcon,
        title: 'Assistente Clínico',
        greeting: 'Olá! Como posso auxiliar com diagnósticos ou planos de tratamento hoje?',
        prompts: ['Resumir o caso do paciente X', 'Quais as opções para dente fraturado?', 'Analisar esta radiografia']
    },
    technical: {
        icon: WrenchScrewdriverIcon,
        title: 'Assistente Técnico',
        greeting: 'Pronto para ajudar com questões técnicas. Qual sua dúvida sobre materiais ou design?',
        prompts: ['Comparar zircônia e e-max', 'Ajustar oclusão em arquivo STL', 'Melhores cimentos para facetas']
    },
    admin: {
        icon: ClipboardDocumentCheckIcon,
        title: 'Assistente Administrativo',
        greeting: 'Olá! Como posso ajudar na gestão da sua clínica hoje?',
        prompts: ['Otimizar agenda de amanhã', 'Gerar relatório financeiro', 'Escrever lembrete para pacientes']
    }
};

const DrLinkChat: React.FC<DrLinkChatProps> = ({ onClose }) => {
  const [mode, setMode] = useState<AiMode>('clinical');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
      setMessages([{ sender: 'ai', text: modeConfig[mode].greeting }]);
  }, [mode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (prompt?: string) => {
    const textToSend = prompt || input;
    if (textToSend.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    
    setInput('');
    setIsLoading(true);

    try {
      const historyForApi = messages.map(msg => ({
          role: msg.sender === 'ai' ? 'model' : 'user',
          parts: [{ text: msg.text }]
      }));
      
      const aiResponseText = await getDrLinkResponse(historyForApi, textToSend, mode);
      const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { sender: 'ai', text: 'Desculpe, ocorreu um erro. Tente novamente.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  }
  
  const currentModeConfig = modeConfig[mode];

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[70vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale z-40">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <SparklesIcon className="w-6 h-6 text-primary-500" />
                <h2 className="ml-2 text-lg font-bold text-gray-800 dark:text-white">Dr. Link: {currentModeConfig.title}</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        <div className="mt-4 flex justify-around bg-gray-100 dark:bg-gray-900/50 p-1 rounded-lg">
            {(Object.keys(modeConfig) as AiMode[]).map(m => {
                const Icon = modeConfig[m].icon;
                return (
                    <button 
                        key={m} 
                        onClick={() => setMode(m)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center transition-colors w-full justify-center ${mode === m ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-300 shadow-sm' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700/50'}`}
                        title={modeConfig[m].title}
                    >
                        <Icon className="w-4 h-4 mr-1.5" />
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                    </button>
                )
            })}
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
            )}
            <div className={`max-w-xs p-3 rounded-2xl ${msg.sender === 'ai' ? 'bg-gray-100 dark:bg-gray-700 rounded-tl-none' : 'bg-primary-500 text-white rounded-br-none'}`}>
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div className="max-w-xs p-3 rounded-2xl bg-gray-100 dark:bg-gray-700 rounded-tl-none">
                  <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></span>
                  </div>
              </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 border-t border-gray-200 dark:border-gray-700">
         <div className="flex flex-wrap gap-2 mb-3">
            {currentModeConfig.prompts.map(p => (
                <button 
                    key={p} 
                    onClick={() => handleSend(p)}
                    className="text-xs px-2.5 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors text-gray-600 dark:text-gray-300"
                >
                    {p}
                </button>
            ))}
         </div>
        <form onSubmit={handleFormSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte ao Dr. Link..."
            className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-700 border-transparent focus:ring-2 focus:ring-primary-500 focus:border-transparent rounded-lg text-sm"
            disabled={isLoading}
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 disabled:bg-gray-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </form>
      </footer>
       <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.3s forwards cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default DrLinkChat;