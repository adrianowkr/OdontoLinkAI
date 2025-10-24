import React from 'react';

interface BarChartData {
    name: string;
    value: number;
}

interface BarChartProps {
    data: BarChartData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const chartHeight = 200;
    const barWidth = 40;
    const barMargin = 20;
    const chartWidth = data.length * (barWidth + barMargin);

    const formatCurrency = (value: number) => {
        if (value >= 1000) {
            return `R$${(value / 1000).toFixed(1)}k`;
        }
        return `R$${value}`;
    }

    return (
        <div className="w-full overflow-x-auto p-2">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`} className="w-full h-auto">
                {data.map((d, i) => {
                    const barHeight = (d.value / maxValue) * chartHeight;
                    const x = i * (barWidth + barMargin);
                    const y = chartHeight - barHeight;
                    return (
                        <g key={d.name} className="group">
                            <rect
                                x={x}
                                y={y}
                                width={barWidth}
                                height={barHeight}
                                className="fill-current text-primary-400 dark:text-primary-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors"
                                rx="4"
                            />
                            <text
                                x={x + barWidth / 2}
                                y={y - 8}
                                textAnchor="middle"
                                className="text-xs font-semibold fill-current text-gray-700 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                {formatCurrency(d.value)}
                            </text>
                            <text
                                x={x + barWidth / 2}
                                y={chartHeight + 20}
                                textAnchor="middle"
                                className="text-sm font-medium fill-current text-gray-500 dark:text-gray-400"
                            >
                                {d.name}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default BarChart;