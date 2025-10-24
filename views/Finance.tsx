import React from 'react';
import Card from '../components/Card';
import BarChart from '../components/charts/BarChart';
import DonutChart from '../components/charts/DonutChart';
import SparklesIcon from '../components/icons/SparklesIcon';
// FIX: Changed import to Patient to use treatment plans for financial data.
import type { Patient } from '../types';

const procedureRevenueData = [
    { name: 'Coroas', value: 45, color: '#4F46E5' },
    { name: 'Restaurações', value: 30, color: '#3B82F6' },
    { name: 'Clareamento', value: 15, color: '#60A5FA' },
    { name: 'Outros', value: 10, color: '#93C5FD' },
];

interface FinanceProps {
    // FIX: Changed prop to 'patients' to access their treatment plans.
    patients: Patient[];
}

const Finance: React.FC<FinanceProps> = ({ patients }) => {

    // FIX: Calculated revenue from completed treatment plans, not clinical cases.
    const completedPlans = patients.flatMap(p => p.treatmentPlans).filter(plan => plan.status === 'Completed');
    const totalRevenue = completedPlans.reduce((acc, plan) => acc + plan.total, 0);
    // Placeholder for expenses
    const totalExpenses = totalRevenue * 0.35; 
    const netProfit = totalRevenue - totalExpenses;
    
    const monthlyRevenueData = [
        { name: 'Mar', value: 7500 },
        { name: 'Abr', value: 9200 },
        { name: 'Mai', value: 8100 },
        { name: 'Jun', value: 11500 },
        { name: 'Jul', value: totalRevenue },
    ];

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Painel Financeiro</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Acompanhe o desempenho financeiro da sua clínica.</p>
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Faturamento (Casos Concluídos)">
                     <p className="text-4xl font-extrabold text-primary-500 dark:text-primary-400">
                        {formatCurrency(totalRevenue)}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">Total acumulado</p>
                </Card>
                <Card title="Despesas Estimadas">
                    <p className="text-4xl font-extrabold text-gray-800 dark:text-white">
                        {formatCurrency(totalExpenses)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Custos de laboratório e materiais</p>
                </Card>
                 <Card title="Lucro Líquido Estimado">
                     <p className="text-4xl font-extrabold text-green-600 dark:text-green-500">
                        {formatCurrency(netProfit)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Margem de 65%</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <Card title="Evolução do Faturamento">
                       <BarChart data={monthlyRevenueData} />
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card title="Receita por Procedimento (%)">
                       <DonutChart data={procedureRevenueData} />
                    </Card>
                </div>
            </div>
            
            <Card title="Insight do Dr. Link">
                <div className="flex items-center">
                    <SparklesIcon className="w-8 h-8 text-primary-500 mr-4 flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-gray-700 dark:text-gray-200">
                            O faturamento com 'Coroas' representou 45% da sua receita este mês.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                           Considere criar um pacote promocional para 'Clareamento', que teve a menor participação, para impulsionar a receita no próximo mês.
                        </p>
                    </div>
                </div>
            </Card>

            <style>{`
               @keyframes fade-in {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default Finance;