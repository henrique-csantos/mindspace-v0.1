import React from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';

// Mock data for the chart
const performanceData = {
  completionRate: 87,
  cancellationRate: 7,
  noShowRate: 6
};

const PerformanceChart: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Taxa de Conclusão</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-52">
          <div className="relative w-40 h-40">
            {/* Circular progress background */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                className="text-gray-200 dark:text-gray-700" 
                strokeWidth="10" 
                stroke="currentColor" 
                fill="transparent" 
                r="40" 
                cx="50" 
                cy="50" 
              />
              
              {/* Completion Rate */}
              <circle 
                className="text-teal-500 dark:text-teal-400" 
                strokeWidth="10" 
                strokeDasharray={`${performanceData.completionRate * 2.51} 251`}
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="40" 
                cx="50" 
                cy="50" 
                transform="rotate(-90 50 50)" 
              />
            </svg>
            
            {/* Percentage display in the center */}
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{performanceData.completionRate}%</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Concluídas</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-gray-50 dark:bg-gray-800/30 p-3 rounded-lg">
            <span className="text-sm text-gray-500 dark:text-gray-400">Canceladas</span>
            <div className="mt-1 flex items-center">
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-400 dark:bg-orange-500 rounded-full" 
                  style={{ width: `${performanceData.cancellationRate}%` }}
                />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{performanceData.cancellationRate}%</span>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/30 p-3 rounded-lg">
            <span className="text-sm text-gray-500 dark:text-gray-400">Não Compareceu</span>
            <div className="mt-1 flex items-center">
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-400 dark:bg-red-500 rounded-full" 
                  style={{ width: `${performanceData.noShowRate}%` }}
                />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{performanceData.noShowRate}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;