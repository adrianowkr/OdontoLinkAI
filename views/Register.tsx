import React, { useState } from 'react';
import SparklesIcon from '../components/icons/SparklesIcon';

interface RegisterProps {
    onRegister: () => void;
    onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call for registration
        setTimeout(() => {
            // In a real app, you might show a success message
            // before switching.
            onRegister();
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="flex justify-center items-center mb-4">
                        <SparklesIcon className="w-12 h-12 text-primary-500" />
                        <h1 className="ml-3 text-4xl font-bold text-gray-800 dark:text-white">OdontoLink AI</h1>
                    </div>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                        Crie sua conta para começar a revolução na sua clínica.
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Criar nova conta</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Nome Completo
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-register" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                E-mail
                            </label>
                            <input
                                id="email-register"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password-register"className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Senha
                            </label>
                            <input
                                id="password-register"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : 'Criar conta'}
                            </button>
                        </div>
                    </form>
                </div>
                 <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Já tem uma conta?{' '}
                    <button type="button" onClick={onSwitchToLogin} className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                        Acesse aqui
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
