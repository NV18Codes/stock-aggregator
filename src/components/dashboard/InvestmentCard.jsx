import React from 'react';

const InvestmentCard = ({ investment }) => {
  const isPositive = investment.profitLoss >= 0;
  const profitLossColor = isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{investment.companyName}</h3>
      <p className="text-sm text-gray-500">Current Price</p>
      <p className="text-lg font-semibold">₹{investment.currentPrice.toFixed(2)}</p>

      <p className="text-sm text-gray-500">Total Value</p>
      <p className="text-lg font-semibold">₹{investment.totalValue.toFixed(2)}</p>

      <p className="text-sm text-gray-500">Profit/Loss</p>
      <p className={`text-lg font-semibold ${profitLossColor}`}>
        {isPositive ? '+' : ''}{investment.profitLossPercentage.toFixed(2)}%
      </p>
    </div>
  );
};

export default InvestmentCard;
