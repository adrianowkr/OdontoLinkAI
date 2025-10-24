import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { getCadFileAnalysis } from '../services/geminiService';
import type { LabOrder, AnalysisResult } from '../types';
import CloudArrowUpIcon from './icons/CloudArrowUpIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';
import CheckIcon from './icons/CheckIcon';
import ExclamationTriangleIcon from './icons/ExclamationTriangleIcon';
import SparklesIcon from './icons/SparklesIcon';

interface FileUploadModalProps {
  // FIX: Updated order prop to include patientName, which is required for display.
  order: (LabOrder & { patientName: string }) | null;
  onClose: () => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ order, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        setAnalysisResult(null); 
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/octet-stream': ['.stl', '.obj', '.dicom'] }, maxFiles: 1 });

  const handleAnalyse = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
        const result = await getCadFileAnalysis(file.name);
        setAnalysisResult(result);
    } catch (error) {
        console.error("Analysis failed:", error);
    } finally {
        setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
      setFile(null);
      setAnalysisResult(null);
  }
  
  const renderContent = () => {
    if (isAnalyzing) {
        return (
            <div className="text-center py-10 space-y-4">
                <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-600 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-primary-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <SparklesIcon className="w-8 h-8 text-primary-500" />
                    </div>
                </div>
                <h3 className="text-xl font-bold mt-4 text-gray-800 dark:text-white">Analisando arquivo...</h3>
                <p className="text-gray-500 dark:text-gray-400">Dr. Link está verificando a integridade e os parâmetros do modelo 3D.</p>
            </div>
        );
    }

    if (analysisResult) {
        const overallSuccess = analysisResult.overallStatus === 'success';
        return (
            <div className="p-6 space-y-4">
                <div className={`p-4 rounded-lg flex items-center ${overallSuccess ? 'bg-green-50 dark:bg-green-900/50' : 'bg-yellow-50 dark:bg-yellow-900/50'}`}>
                     {overallSuccess ? <CheckIcon className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" /> : <ExclamationTriangleIcon className="w-8 h-8 text-yellow-500 mr-4 flex-shrink-0" />}
                    <div>
                        <h3 className={`text-lg font-bold ${overallSuccess ? 'text-green-800 dark:text-green-200' : 'text-yellow-800 dark:text-yellow-200'}`}>
                            {overallSuccess ? 'Análise Concluída: Aprovado' : 'Análise Concluída: Alertas Encontrados'}
                        </h3>
                        <p className={`text-sm ${overallSuccess ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
                            {analysisResult.fileName}
                        </p>
                    </div>
                </div>
                <ul className="space-y-2">
                    {analysisResult.results.map((item, index) => (
                        <li key={index} className="flex items-start p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                           {item.status === 'success' ? <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" /> : <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />}
                           <div>
                                <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{item.check}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{item.message}</p>
                           </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    
    return (
        <div className="p-6 space-y-4">
            <div {...getRootProps()} className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary-500 bg-primary-50 dark:bg-gray-700/50' : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'}`}>
                <input {...getInputProps()} />
                <CloudArrowUpIcon className="w-12 h-12 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {isDragActive ? 'Solte o arquivo aqui...' : 'Arraste e solte o arquivo ou clique para selecionar'}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">.STL, .OBJ, .DICOM</p>
            </div>
             {file && (
                <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <DocumentTextIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        <span className="text-sm text-gray-800 dark:text-gray-200 truncate">{file.name}</span>
                    </div>
                    <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            )}
        </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">{order ? 'Analisar Arquivo do Pedido' : 'Novo Pedido Laboratorial'}</h2>
            {/* FIX: Correctly displays patientName from the updated order prop. */}
            {order && <p className="text-sm text-gray-500 dark:text-gray-400">{order.id} - {order.patientName}</p>}
          </div>
          <button onClick={onClose} disabled={isAnalyzing} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        {renderContent()}
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
            {analysisResult ? (
                <>
                    <button onClick={handleReset} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                        Analisar Outro
                    </button>
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600">
                        Fechar
                    </button>
                </>
            ) : (
                <>
                    <button onClick={onClose} disabled={isAnalyzing} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 disabled:opacity-50">
                        Cancelar
                    </button>
                    <button onClick={handleAnalyse} disabled={!file || isAnalyzing} className="w-36 flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isAnalyzing ? 'Analisando...' : (
                            <>
                                <SparklesIcon className="w-4 h-4 mr-2"/>
                                Analisar
                            </>
                        )}
                    </button>
                </>
            )}
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

export default FileUploadModal;