import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const PortfolioSummary = ({ portfolio }) => {
  const isPositive = portfolio.profitLossPercentage >= 0;
  const profitLossColor = isPositive ? 'text-green-600' : 'text-red-600';
  const bgGradient = isPositive 
    ? 'bg-gradient-to-r from-blue-50 to-green-50 border-green-200' 
    : 'bg-gradient-to-r from-blue-50 to-red-50 border-red-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border p-6 ${bgGradient}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Portfolio Summary</h2>
          <p className="text-gray-600">Your investment performance</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
          {isPositive ? (
            <TrendingUp className="h-5 w-5 text-green-600" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-600" />
          )}
          <span className={`text-lg font-bold ${profitLossColor}`}>
            {isPositive ? '+' : ''}{portfolio.profitLossPercentage.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Invested</p>
          <p className="text-2xl font-bold text-gray-800">₹{portfolio.totalInvested.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Current Value</p>
          <p className="text-2xl font-bold text-gray-800">₹{portfolio.currentValue.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Profit/Loss</p>
          <p className={`text-2xl font-bold ${profitLossColor}`}>
            {isPositive ? '+' : ''}₹{Math.abs(portfolio.profitLoss).toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioSummary;
