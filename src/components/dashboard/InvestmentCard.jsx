import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const InvestmentCard = ({ investment }) => {
  const isPositive = investment.profitLossPercentage >= 0;
  const profitLossColor = isPositive ? 'text-green-600' : 'text-red-600';
  const bgColor = isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
  const borderColor = isPositive ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)';

  // Format data for chart
  const chartData = {
    labels: investment.historicalData.map(data => data.date),
    datasets: [
      {
        data: investment.historicalData.map(data => data.value),
        fill: true,
        backgroundColor: bgColor,
        borderColor: borderColor,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{investment.symbol}</CardTitle>
          <p className="text-sm text-gray-600">{investment.companyName}</p>
        </div>
        <div className={`p-2 rounded-full ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
          {isPositive ? (
            <TrendingUp className="h-5 w-5 text-green-600" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-600" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-24 mb-4">
          <Line data={chartData} options={chartOptions} />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Current Price</p>
            <p className="text-lg font-semibold">${investment.currentPrice.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Shares</p>
            <p className="text-lg font-semibold">{investment.shares}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Value</p>
            <p className="text-lg font-semibold">${investment.totalValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Profit/Loss</p>
            <p className={`text-lg font-semibold ${profitLossColor}`}>
              {isPositive ? '+' : ''}{investment.profitLossPercentage.toFixed(2)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentCard;
