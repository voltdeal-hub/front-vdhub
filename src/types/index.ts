// Tipos para o VoltDeal Hub

export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  avatar?: string;
}

export interface EnergyContract {
  id: string;
  providerId: string;
  providerName: string;
  providerLogo: string;
  type: 'solar' | 'wind' | 'hydro' | 'other';
  price: number;
  power: string;
  rating: number;
  description: string;
  isFavorite: boolean;
}

export interface DashboardStats {
  activeContracts: number;
  totalInvested: number;
  favorites: number;
  totalPower: string;
  energyBreakdown: {
    solar: number;
    wind: number;
    hydro: number;
    other: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
