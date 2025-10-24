import React from 'react';

interface DonutChartData {
    name: string;
    value: number;
    color: string;
}

interface DonutChartProps {
    data: DonutChartData[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
    const total = data.reduce((acc, d) => acc + d.value, 0);
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    let accumulated = 0;

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4">
            <div className="relative w-40 h-40">
                <svg viewBox="0 0 140 140" className="transform -rotate-90">
                    {data.map((d, i) => {
                        const percentage = (d.value / total) * 100;
                        const strokeDashoffset = circumference - (accumulated / 100) * circumference;
                        accumulated += percentage;
                        
                        return (
                            <circle
                                key={i}
                                r={radius}
                                cx="70"
                                cy="70"
                                fill="transparent"
                                stroke={d.color}
                                strokeWidth="20"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                className="transition-all duration-500"
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-gray-800 dark:text-white">{total}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
                </div>
            </div>
            <div className="space-y-2">
                {data.map(d => (
                    <div key={d.name} className="flex items-center text-sm">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: d.color }}></span>
                        <span className="text-gray-700 dark:text-gray-300">{d.name}:</span>
                        <span className="ml-1 font-semibold text-gray-800 dark:text-white">{d.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonutChart;