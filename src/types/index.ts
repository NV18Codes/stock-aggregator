export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface Investment {
  id: string;
  symbol: string;
  companyName: string;
  shares: number;
  buyPrice: number;
  currentPrice: number;
  totalInvested: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  historicalData: HistoricalData[];
}

export interface HistoricalData {
  date: string;
  value: number;
}

export interface Portfolio {
  totalInvested: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  investments: Investment[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}