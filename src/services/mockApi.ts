import { User, Portfolio, Investment, Testimonial, PricingPlan } from '../types';

// Mock user data
const mockUsers: Record<string, User> = {
  'user@example.com': {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    joinDate: '2023-01-15',
  },
};

// Mock authentication
export const mockAuthenticateUser = (
  email: string,
  password: string
): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers[email];
      if (user && password === 'password') {
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800);
  });
};

// Mock portfolio data
export const fetchUserPortfolio = (userId: string): Promise<Portfolio> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockInvestments: Investment[] = [
        {
          id: '1',
          symbol: 'AAPL',
          companyName: 'Apple Inc.',
          shares: 10,
          buyPrice: 150.75,
          currentPrice: 175.50,
          totalInvested: 1507.50,
          totalValue: 1755.00,
          profitLoss: 247.50,
          profitLossPercentage: 16.42,
          historicalData: generateHistoricalData(30, 140, 180),
        },
        {
          id: '2',
          symbol: 'MSFT',
          companyName: 'Microsoft Corporation',
          shares: 5,
          buyPrice: 280.50,
          currentPrice: 310.25,
          totalInvested: 1402.50,
          totalValue: 1551.25,
          profitLoss: 148.75,
          profitLossPercentage: 10.61,
          historicalData: generateHistoricalData(30, 270, 320),
        },
        {
          id: '3',
          symbol: 'AMZN',
          companyName: 'Amazon.com Inc.',
          shares: 3,
          buyPrice: 3200.00,
          currentPrice: 3050.75,
          totalInvested: 9600.00,
          totalValue: 9152.25,
          profitLoss: -447.75,
          profitLossPercentage: -4.66,
          historicalData: generateHistoricalData(30, 2900, 3300),
        },
        {
          id: '4',
          symbol: 'GOOGL',
          companyName: 'Alphabet Inc.',
          shares: 2,
          buyPrice: 2700.50,
          currentPrice: 2850.25,
          totalInvested: 5401.00,
          totalValue: 5700.50,
          profitLoss: 299.50,
          profitLossPercentage: 5.55,
          historicalData: generateHistoricalData(30, 2600, 2900),
        },
      ];

      const totalInvested = mockInvestments.reduce(
        (sum, inv) => sum + inv.totalInvested,
        0
      );
      const currentValue = mockInvestments.reduce(
        (sum, inv) => sum + inv.totalValue,
        0
      );
      const profitLoss = currentValue - totalInvested;
      const profitLossPercentage = (profitLoss / totalInvested) * 100;

      resolve({
        totalInvested,
        currentValue,
        profitLoss,
        profitLossPercentage,
        investments: mockInvestments,
      });
    }, 1000);
  });
};

// Generate historical data for charts
function generateHistoricalData(
  days: number,
  minPrice: number,
  maxPrice: number
): { date: string; value: number }[] {
  const data = [];
  const today = new Date();
  const range = maxPrice - minPrice;

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate a somewhat realistic price movement
    const randomFactor = Math.sin(i / 5) * 0.5 + Math.random() * 0.5;
    const price = minPrice + range * (0.4 + randomFactor * 0.6);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(price.toFixed(2)),
    });
  }

  return data;
}

// Mock testimonials
export const fetchTestimonials = (): Promise<Testimonial[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Sarah Johnson',
          role: 'Marketing Director',
          company: 'Global Brands Inc.',
          content: 'The trading platform has completely transformed how I invest. The professional management of my portfolio has resulted in consistent returns that exceeded my expectations.',
          avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300',
        },
        {
          id: '2',
          name: 'Michael Chen',
          role: 'Software Engineer',
          company: 'Tech Solutions',
          content: 'I\'ve tried several trading platforms, but this one stands out with its intuitive interface and professional management. The performance of my investments has been remarkable.',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
        },
        {
          id: '3',
          name: 'Emily Rodriguez',
          role: 'Financial Analyst',
          content: 'As someone who works in finance, I appreciate the transparency and professional approach. The platform provides detailed insights while the team handles the complex trading strategies.',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
        },
      ]);
    }, 800);
  });
};

// Mock pricing plans
export const fetchPricingPlans = (): Promise<PricingPlan[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'basic',
          name: 'Basic',
          price: 29,
          description: 'Perfect for beginners looking to start investing',
          features: [
            'Portfolio management',
            'Weekly market insights',
            'Basic trading strategies',
            'Email support',
          ],
        },
        {
          id: 'pro',
          name: 'Professional',
          price: 99,
          description: 'For serious investors seeking optimal returns',
          features: [
            'Advanced portfolio management',
            'Daily market analysis',
            'Priority trading execution',
            'Personalized investment strategy',
            '24/7 dedicated support',
          ],
          isPopular: true,
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: 299,
          description: 'Full-service solution for high-net-worth individuals',
          features: [
            'Custom portfolio construction',
            'Real-time market analysis',
            'Advanced risk management',
            'Tax optimization strategies',
            'Dedicated financial advisor',
            'Concierge service',
          ],
        },
      ]);
    }, 800);
  });
};