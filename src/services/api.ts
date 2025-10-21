import type { User, EnergyContract, DashboardStats, ApiResponse } from '../types';

// Configuração da API
const API_BASE_URL = 'https://api.voltdealhub.com';

// Mock data para desenvolvimento
const mockContracts: EnergyContract[] = [
  {
    id: '1',
    providerId: 'neo-1',
    providerName: 'NeoEnergia',
    providerLogo: '',
    type: 'hydro',
    price: 12.00,
    power: '50KW/h',
    rating: 4.8,
    description: 'Maior grupo privado do setor elétrico brasileiro',
    isFavorite: true
  },
  {
    id: '2',
    providerId: 'setta-1',
    providerName: 'Setta Energia',
    providerLogo: '',
    type: 'solar',
    price: 17.00,
    power: '75KW/h',
    rating: 4.9,
    description: 'Top 1 em vendas em recife, a Setta preza pelo feedback do consumidor',
    isFavorite: false
  }
];

const mockStats: DashboardStats = {
  activeContracts: 12,
  totalInvested: 20000,
  favorites: 5,
  totalPower: '25KW/h',
  energyBreakdown: {
    wind: 30,
    solar: 25,
    hydro: 35,
    other: 10
  }
};

// Helper para simular delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Service
export const api = {
  // Auth
  async login(email: string, password: string): Promise<ApiResponse<User>> {
    await delay(1000);
    return {
      success: true,
      data: {
        id: '1',
        name: 'Gabriel Dias',
        email,
        address: 'Avenida, Cais do Apolo, 77, Recife - PE, 50030-220'
      }
    };
  },

  async register(name: string, email: string, password: string): Promise<ApiResponse<User>> {
    await delay(1000);
    return {
      success: true,
      data: {
        id: '1',
        name,
        email
      }
    };
  },

  // Contracts
  async getContracts(): Promise<ApiResponse<EnergyContract[]>> {
    await delay(800);
    return {
      success: true,
      data: mockContracts
    };
  },

  async getContractById(id: string): Promise<ApiResponse<EnergyContract>> {
    await delay(500);
    const contract = mockContracts.find(c => c.id === id);
    if (!contract) {
      return {
        success: false,
        data: {} as EnergyContract,
        message: 'Contrato não encontrado'
      };
    }
    return {
      success: true,
      data: contract
    };
  },

  async toggleFavorite(id: string): Promise<ApiResponse<boolean>> {
    await delay(300);
    return {
      success: true,
      data: true
    };
  },

  async createContract(contractId: string): Promise<ApiResponse<string>> {
    await delay(1000);
    return {
      success: true,
      data: contractId,
      message: 'Contrato criado com sucesso!'
    };
  },

  // Dashboard
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    await delay(600);
    return {
      success: true,
      data: mockStats
    };
  },

  // User
  async updateAddress(address: string): Promise<ApiResponse<boolean>> {
    await delay(500);
    return {
      success: true,
      data: true,
      message: 'Endereço atualizado com sucesso!'
    };
  }
};

// Para quando a API real estiver disponível:
/*
export const api = {
  async login(email: string, password: string): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },
  // ... outras funções com fetch real
};
*/
