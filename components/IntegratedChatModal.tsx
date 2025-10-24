import React, { useState, useRef, useEffect } from 'react';
import type { IntegratedChatMessage, Patient, LabOrder } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import { getIntegratedChatResponse } from '../services/geminiService';
import UsersIcon from './icons/UsersIcon';
import BeakerIcon from './icons/BeakerIcon';

interface IntegratedChatModalProps {
  onClose: () => void;
  // FIX: Updated context type to allow patientName to be passed with a LabOrder.
  context: Patient | (LabOrder & { patientName: string });
}

const IntegratedChatModal: React.FC<IntegratedChatModalProps> = ({ onClose, context }) => {
  const isPatientContext = 'email' in context;
  const contextName = isPatientContext ? context.name : context.id;
  
  const getInitialMessages = (): IntegratedChatMessage[] => {
      if (isPatientContext) {
          return [
              { sender: 'AI', text: `Chat iniciado sobre o paciente ${context.name}.`, timestamp: '09:00' },
              { sender: 'Patient', text: 'Olá Doutora, estou com um pouco de sensibilidade após o último procedimento.', timestamp: '09:01' },
          ];
      } else {
          return [
              // FIX: context.patientName is now available due to updated prop type.
              { sender: 'AI', text: `Chat iniciado sobre o pedido ${context.id} (${context.patientName}).`, timestamp: '10:15' },
              { sender: 'Dentist', text: 'Olá! Podemos adiantar a entrega desta coroa?', timestamp: '10:16' },
              { sender: 'Lab', text: 'Vou verificar a possibilidade e te retorno em breve.', timestamp: '10:18' },
          ];
      }
  }

  const [messages, setMessages] = useState<IntegratedChatMessage[]>(getInitialMessages());
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: IntegratedChatMessage = { 
        sender: 'Dentist', 
        text: input,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit'})
    };
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const contextString = isPatientContext ? `paciente ${context.name}` : `pedido ${context.id}`;
      const aiResponseText = await getIntegratedChatResponse(contextString, currentInput);
      const aiMessage: IntegratedChatMessage = { 
          sender: isPatientContext ? 'Patient' : 'Lab', // Simulate response from the other party
          text: aiResponseText, 
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit'})
      };
      // Add a small delay for realism
      setTimeout(() => {
          setMessages(prev => [...prev, aiMessage]);
          setIsLoading(false);
      }, 1500);
    } catch (error) {
      const errorMessage: IntegratedChatMessage = { sender: 'AI', text: 'Desculpe, ocorreu um erro.', timestamp: new Date().toLocaleTimeString() };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  }
  
  const senderConfig: Record<IntegratedChatMessage['sender'], {align: string, bubble: string, icon: React.ReactNode | null, iconBg: string}> = {
      'Dentist': { align: 'justify-end', bubble: 'bg-primary-500 text-white rounded-br-none', icon: <UsersIcon className="w-5 h-5 text-white"/>, iconBg: 'bg-primary-500' },
      'Lab': { align: '', bubble: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 rounded-bl-none', icon: <BeakerIcon className="w-5 h-5 text-yellow-600"/>, iconBg: 'bg-yellow-200' },
      'Patient': { align: '', bubble: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-bl-none', icon: <UsersIcon className="w-5 h-5 text-green-600"/>, iconBg: 'bg-green-200' },
      // FIX: Added iconBg property to make the object shape consistent and resolve TypeScript error.
      'AI': { align: 'justify-center', bubble: 'text-center w-full', icon: null, iconBg: '' }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg h-[70vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            {isPatientContext ? <UsersIcon className="w-6 h-6 text-primary-500" /> : <BeakerIcon className="w-6 h-6 text-primary-500" />}
            <h2 className="ml-2 text-lg font-bold text-gray-800 dark:text-white">Chat: {contextName}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg, index) => {
              const config = senderConfig[msg.sender];
              if (msg.sender === 'AI') {
                  return <div key={index} className="text-center text-xs text-gray-400 dark:text-gray-500 py-2">{msg.text}</div>
              }
              return (
                <div key={index} className={`flex items-start gap-3 ${config.align}`}>
                  {config.align === '' && config.icon && (
                    <div className={`w-8 h-8 rounded-full ${config.iconBg} flex items-center justify-center flex-shrink-0`}>
                      {config.icon}
                    </div>
                  )}
                  <div className={`max-w-md p-3 rounded-2xl ${config.bubble}`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 opacity-70 ${config.align === 'justify-end' ? 'text-right' : 'text-left'}`}>{msg.timestamp}</p>
                  </div>
                </div>
              )
          })}
          {isLoading && (
             <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <SparklesIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div className="max-w-md p-3 rounded-2xl bg-gray-100 dark:bg-gray-700 rounded-tl-none">
                    <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></span>
                    </div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleFormSubmit} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-700 border-transparent focus:ring-2 focus:ring-primary-500 focus:border-transparent rounded-lg text-sm"
              disabled={isLoading}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 disabled:bg-gray-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </form>
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
  );
};

export default IntegratedChatModal;