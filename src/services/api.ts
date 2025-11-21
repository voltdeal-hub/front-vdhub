import type { User, EnergyContract, DashboardStats, ApiResponse } from '../types';

const API_BASE_URL = 'https://back-vdhub.onrender.com';

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const resp = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });

    const text = await resp.text();
    const parsed = text ? JSON.parse(text) : null;

    if (!resp.ok) {
      return {
        success: false,
        data: {} as T,
        message: parsed?.detail || parsed?.message || `Erro HTTP ${resp.status}`
      };
    }

    return { success: true, data: parsed };
  } catch (err: any) {
    return {
      success: false,
      data: {} as T,
      message: err.message || 'Erro de conexão'
    };
  }
}

export const api = {
  // ============================================================
  // 🔹 LOGIN
  // ============================================================
  async login(email: string, senha: string): Promise<User> {
    const resp = await fetch(`${API_BASE_URL}/usuario/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });

    if (!resp.ok) {
      const error = await resp.json().catch(() => null);
      throw new Error(error?.message || error?.detail || 'Erro ao fazer login.');
    }

    return resp.json();
  },

  // ============================================================
  // 🔹 CADASTRO
  // ============================================================
  async registerCompany(
  nome_empresa: string,
  nome_responsavel: string,
  cnpj: string,
  email: string,
  senha: string
): Promise<ApiResponse<User>> {
  const response = await request<User>('/usuario/cadastro', {
    method: 'POST',
    body: JSON.stringify({
      nome_empresa,
      nome_responsavel,
      cnpj,
      email,
      senha
    })
  });

  return response;
},


  // ============================================================
  // 🔹 LISTAR CONTRATOS DO USUÁRIO 
  // ============================================================
  async getContracts(userId: number): Promise<ApiResponse<EnergyContract[]>> {
    const response = await request<any[]>(`/contrato/listar/${userId}`);

    if (!response.success || !response.data) {
      return { success: false, data: [], message: response.message };
    }

    // Adaptando os dados do backend → formato do frontend
    const converted: EnergyContract[] = response.data.map((c) => ({
      id: String(c.id),
      providerId: String(c.id_usuario),
      providerName: c.nome_fornecedor,
      providerLogo: '',
      type: c.fonte_energia,
      price: c.preco_kwh,
      power: `${c.prazo_vigencia_meses} meses`,
      rating: 4.5,
      description: c.nome_plano,
      isFavorite: false
    }));

    return {
      success: true,
      data: converted
    };
  },

  // ============================================================
  // 🔹 BUSCAR CONTRATO POR ID
  // ============================================================
  async getContractById(id: number): Promise<ApiResponse<EnergyContract>> {
    const resp = await request<any>(`/contrato/${id}`);
    if (!resp.success || !resp.data) {
      return { success: false, data: {} as EnergyContract, message: 'Contrato não encontrado' };
    }
    const c = resp.data;
    return {
      success: true,
      data: {
        id: String(c.id),
        providerId: String(c.id_usuario),
        providerName: c.nome_fornecedor,
        providerLogo: '',
        type: c.fonte_energia,
        price: c.preco_kwh,
        power: `${c.prazo_vigencia_meses} meses`,
        rating: 4.5,
        description: c.nome_plano,
        isFavorite: false,
        data_criacao: c.data_criacao
      }
    };
  },



  // ============================================================
  // 🔹 Favorito (mock pois seu backend não tem esse endpoint)
  // ============================================================
  async toggleFavorite(id: string): Promise<ApiResponse<boolean>> {
    return { success: true, data: true };
  },

  // ============================================================
  // 🔹 Dashboard (mock)
  // ============================================================
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return {
      success: true,
      data: {
        activeContracts: 12,
        totalInvested: 10000,
        favorites: 3,
        totalPower: '20KW/h',
        energyBreakdown: {
          wind: 20,
          solar: 50,
          hydro: 20,
          other: 10
        }
      }
    };
  },

  // ============================================================
  // 🔹 Atualizar endereço (mock)
  // ============================================================
  async updateAddress(address: string): Promise<ApiResponse<boolean>> {
    return { success: true, data: true };
  },

  // ============================================================
  // 🔹 Get das ofertas da Home_app
  // ============================================================
  async getOffers(): Promise<ApiResponse<EnergyContract[]>> {
  const response = await request<any[]>(`/oferta/`);

  if (!response.success || !response.data) {
    return { success: false, data: [], message: response.message };
  }

  // Adaptando a resposta do backend para o modelo do frontend
  const mapped = response.data.map((o: any) => ({
    id: String(o.id),
    providerId: String(o.id), // NÃO EXISTE id_fornecedor
    providerName: o.nome_fornecedor || "",
    providerLogo: "",
    type: o.fonte_energia || "",
    price: o.preco_kwh || 0,
    power: `${o.prazo_vigencia_meses} meses`,
    rating: 4.5,
    description: o.nome_plano || "",
    isFavorite: false
  }));



  return {
    success: true,
    data: mapped
  };
},
  async getOfferById(id: number): Promise<ApiResponse<EnergyContract>> {
    const resp = await request<any>(`/oferta/${id}`);

    if (!resp.success || !resp.data) {
      return { success: false, data: {} as EnergyContract, message: 'Oferta não encontrada' };
    }

    const o = resp.data;

    return {
      success: true,
      data: {
        id: String(o.id),
        providerId: String(o.id), // não existe id_fornecedor
        providerName: o.nome_fornecedor,
        providerLogo: '',
        type: o.fonte_energia,
        price: o.preco_kwh,
        power: `${o.prazo_vigencia_meses} meses`,
        rating: 4.5,
        description: o.nome_plano,
        isFavorite: false
      }
    };
  },


  // ============================================================
  // 🔹Post pra criar novo contrato (com base nas offers da home)
  // ============================================================
async createContract(contract: EnergyContract, userId: number): Promise<ApiResponse<any>> {
  const payload = {
    id_usuario: userId,
    nome_fornecedor: contract.providerName,
    nome_plano: contract.description,
    preco_kwh: contract.price,
    fonte_energia: contract.type,
    prazo_vigencia_meses: Number(contract.power.replace(/\D/g, "")) // extrai números
  };

  const response = await request('/contrato/', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return response;
},

  // ============================================================
  // 🔹Post pra gerar preview do contrato PDF
  // ============================================================
async generateContractPreview(
  usuario: { id: number; nome_empresa: string; nome_responsavel: string; email: string; cnpj: string },
  oferta: { id: number; nome_fornecedor: string; nome_plano: string; preco_kwh: number; fonte_energia: string; prazo_vigencia_meses: number }
): Promise<Blob> {
  const resp = await fetch(`${API_BASE_URL}/contrato/gerar-preview`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, oferta })
  });

  if (!resp.ok) throw new Error('Erro ao gerar contrato');
  return resp.blob();
}





};
