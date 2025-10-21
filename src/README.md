# VoltDeal Hub 🔋⚡

Marketplace de energia responsivo desenvolvido em React + TypeScript + Tailwind CSS.

## 📱 Sobre o Projeto

VoltDeal Hub é o primeiro marketplace de energia do Brasil, permitindo que usuários contratem diferentes tipos de energia renovável (solar, eólica, hidrelétrica) de diversos fornecedores de forma simples e transparente.

## 🎨 Funcionalidades

- ✅ Cadastro e login de usuários
- ✅ Dashboard com estatísticas de consumo e contratos
- ✅ Marketplace com listagem de ofertas de energia
- ✅ Sistema de favoritos
- ✅ Busca e filtros de contratos
- ✅ Detalhamento de contratos
- ✅ Perfil de usuário
- ✅ Interface responsiva (mobile-first)
- ✅ Navegação com bottom bar

## 🛠️ Tecnologias

- **React** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **React Router** - Navegação entre páginas
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Sonner** - Notificações toast
- **API Service** - Camada de abstração para requisições (preparada para backend real)

## 📁 Estrutura do Projeto

```
/
├── components/          # Componentes reutilizáveis
│   ├── figma/          # Componentes do Figma
│   ├── ui/             # Componentes ShadCN
│   ├── BottomNav.tsx   # Barra de navegação inferior
│   └── StatusBar.tsx   # Barra de status (topo)
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Tela inicial
│   ├── Login.tsx       # Tela de login
│   ├── Register.tsx    # Tela de cadastro
│   ├── Dashboard.tsx   # Dashboard com estatísticas
│   ├── Marketplace.tsx # Listagem de contratos
│   ├── ContractDetails.tsx # Detalhes do contrato
│   ├── Contracts.tsx   # Meus contratos
│   └── Profile.tsx     # Perfil do usuário
├── services/           # Serviços e API
│   └── api.ts          # Configuração da API
├── types/              # Tipos TypeScript
│   └── index.ts        # Tipos principais
├── imports/            # Importações do Figma
└── styles/             # Estilos globais
```

## 🚀 Como Usar

### Navegação

1. **Tela Inicial** (`/`) - Apresentação do app com opções de login e cadastro
2. **Login** (`/login`) - Autenticação de usuário existente
3. **Cadastro** (`/register`) - Criação de nova conta
4. **Dashboard** (`/dashboard`) - Visão geral de contratos e consumo
5. **Marketplace** (`/marketplace`) - Listagem de ofertas de energia
6. **Detalhes** (`/contract/:id`) - Informações detalhadas de um contrato
7. **Meus Contratos** (`/contracts`) - Contratos ativos do usuário
8. **Perfil** (`/profile`) - Informações do usuário

### Rotas Protegidas

As rotas `/dashboard`, `/marketplace`, `/contract/:id`, `/contracts` e `/profile` são protegidas e requerem autenticação. Usuários não autenticados são redirecionados para `/login`.

## 🔌 Integração com Backend

O projeto está preparado para integração com uma API real. Atualmente usa dados mockados no arquivo `/services/api.ts`.

### Para integrar com backend real:

1. Configurar a variável de ambiente `REACT_APP_API_URL`:
```bash
REACT_APP_API_URL=https://sua-api.com
```

2. Descomentar as funções reais no arquivo `/services/api.ts` e implementar as requisições com `fetch` ou `axios`.

### Endpoints esperados:

```typescript
// Auth
POST /auth/login
POST /auth/register

// Contracts
GET /contracts
GET /contracts/:id
POST /contracts
PUT /contracts/:id/favorite

// Dashboard
GET /dashboard/stats

// User
PUT /user/address
GET /user/profile
```

## 📊 Tipos de Dados

### User
```typescript
{
  id: string;
  name: string;
  email: string;
  address?: string;
  avatar?: string;
}
```

### EnergyContract
```typescript
{
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
```

### DashboardStats
```typescript
{
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
```

## 🎨 Design System

### Cores Principais
- **Verde Principal**: `#27693A`
- **Verde Escuro**: `#1f5230`
- **Branco**: `#ffffff`
- **Cinza Claro**: `#f9f9f9`

### Cores por Tipo de Energia
- **Eólica**: `#9deb44`
- **Solar**: `#fe7f00`
- **Hidrelétrica**: `#003be3`
- **Outros**: `#f34d75`

### Fontes
- **Títulos**: Raleway (400-800)
- **Texto**: Nunito Sans (300-700)

## 🔐 Autenticação

O sistema usa `localStorage` para armazenar o usuário logado. Em produção, considere usar:
- JWT tokens
- HttpOnly cookies
- Context API ou Redux para state management
- Refresh tokens

## 📱 Responsividade

O app é mobile-first com largura máxima de 448px (`max-w-md`) centralizad na tela. Perfeito para dispositivos móveis.

## 🚧 Próximos Passos

- [ ] Implementar backend real
- [ ] Adicionar autenticação JWT
- [ ] Implementar filtros avançados no marketplace
- [ ] Adicionar histórico de consumo
- [ ] Implementar notificações push
- [ ] Adicionar modo escuro
- [ ] Implementar pagamentos
- [ ] Adicionar chat com fornecedores

## 📄 Licença

Este projeto foi desenvolvido como demonstração e pode ser usado livremente.

---

Desenvolvido com ⚡ para VoltDeal Hub
