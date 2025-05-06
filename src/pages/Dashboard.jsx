import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import InvestmentCard from '../components/dashboard/InvestmentCard';
import { fetchUserPortfolio } from '../services/mockApi';

const Dashboard = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate('/');
      return;
    }

    const loadUserData = async () => {
      setIsLoading(true);
      try {
        if (state.user) {
          const userPortfolio = await fetchUserPortfolio(state.user.id);
          setPortfolio(userPortfolio);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [state.isAuthenticated, state.user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!state.isAuthenticated) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header with user info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              {state.user?.avatar ? (
                <img
                  src={state.user.avatar}
                  alt={state.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <UserIcon className="h-6 w-6 text-blue-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {state.user?.name}
              </h1>
              <p className="text-gray-600">
                Member since {new Date(state.user?.joinDate || '').toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          portfolio && (
            <>
              {/* Portfolio Summary */}
              <PortfolioSummary portfolio={portfolio} />
              
              {/* Investments Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8"
              >
                <h2 className="text-xl font-semibold mb-4">Your Investments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {portfolio.investments.map(investment => (
                    <InvestmentCard key={investment.id} investment={investment} />
                  ))}
                </div>
              </motion.div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
