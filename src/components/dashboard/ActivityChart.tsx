import React from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';

// Mock data for chart
const chartData = [
  { month: 'Jan', appointments: 32 },
  { month: 'Fev', appointments: 45 },
  { month: 'Mar', appointments: 39 },
  { month: 'Abr', appointments: 52 },
  { month: 'Mai', appointments: 48 },
  { month: 'Jun', appointments: 53 },
  { month: 'Jul', appointments: 58 },
  { month: 'Ago', appointments: 46 },
  { month: 'Set', appointments: 50 },
  { month: 'Out', appointments: 42 },
  { month: 'Nov', appointments: 37 },
  { month: 'Dez', appointments: 29 }
];

const ActivityChart: React.FC = () => {
  // Find the max value for scaling
  const maxValue = Math.max(...chartData.map(d => d.appointments));
  
  // Calculate bar height as a percentage of max value
  const calculateHeight = (value: number) => {
    return (value / maxValue) * 100;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Atividade Anual</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <div className="flex h-full items-end space-x-2">
            {chartData.map((data, index) => (
              <div 
                key={index} 
                className="flex-1 flex flex-col items-center"
              >
                <div className="relative w-full flex justify-center group">
                  <div 
                    className="w-full max-w-12 bg-teal-200 dark:bg-teal-800/40 rounded-t-sm transition-all duration-300 hover:bg-teal-300 dark:hover:bg-teal-700/40"
                    style={{ height: `${calculateHeight(data.appointments)}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {data.appointments} consultas
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;