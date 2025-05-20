import React from 'react';
import Card, { CardContent } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  bgColor = 'bg-teal-500'
}) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-2/3 p-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            
            {change && (
              <div className="mt-2 flex items-center">
                <span 
                  className={`text-xs font-medium ${
                    change.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {change.isPositive ? '+' : ''}{change.value}%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs. mês anterior</span>
              </div>
            )}
          </div>
          
          <div className={`w-1/3 flex items-center justify-center ${bgColor} bg-opacity-10 dark:bg-opacity-20`}>
            <div className={`p-3 rounded-full ${bgColor} bg-opacity-20 dark:bg-opacity-30`}>
              {icon}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;