import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { api } from '../services/api'; // Import da API
import type { DashboardStats } from '../types'; // Import de Types


export function Contracts() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [month, setMonth] = useState('Outubro');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await api.getDashboardStats();
      if (response.success) {
        setStats(response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  const energyTypes = [
    { name: 'Energia Eólica', color: '#9deb44', value: stats.energyBreakdown.wind },
    { name: 'Energia Solar', color: '#fe7f00', value: stats.energyBreakdown.solar },
    { name: 'Energia Hidrelétrica', color: '#003be3', value: stats.energyBreakdown.hydro },
    { name: 'Outros', color: '#f34d75', value: stats.energyBreakdown.other }
  ];
  
  return (
    <div className="min-h-screen bg-white pb-[84px]">
      
      <div className="px-6 py-8">
        <h1 className="font-['Raleway',sans-serif] font-bold text-[28px] text-[#202020] mb-6">
          Meus Contratos 
        </h1>
      </div>

      <div className="px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] bg-gray-300 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-[#27693A] to-[#1f5230]" />
          </div>
          <div>
            <p className="font-['Raleway',sans-serif] font-bold text-[21px] text-[#202020]">
              {user.name || 'Usuário'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/notifications")}
            className="w-[35px] h-[35px] bg-[#f9f9f9] rounded-full flex items-center justify-center"
          >
            <Bell className="w-5 h-5 text-[#27693A]" />
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="w-[35px] h-[35px] bg-[#f9f9f9] rounded-full flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-[#27693A]" />
          </button>
        </div>
      </div>

      {/* Month selector */}
      <div className="px-6 mb-6">
        <div className="bg-[#f9f9f9] rounded-[18px] h-[50px] flex items-center justify-between px-6">
          <button className="rotate-90">
            <ChevronLeft className="w-6 h-6 text-[#27693A]" />
          </button>
          <p className="font-['Raleway',sans-serif] font-bold text-[18px]">
            {month}
          </p>
          <button className="-rotate-90">
            <ChevronRight className="w-6 h-6 text-[#27693A]" />
          </button>
        </div>
      </div>

      {/* Energy Chart */}
      <div className="px-6 mb-8">
        <div className="relative h-[250px] flex items-center justify-center">
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[250px] h-[250px] bg-white rounded-full shadow-[0px_3px_8px_0px_rgba(0,0,0,0.16)]" />
          </div>
          
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[140px] h-[140px] bg-white rounded-full shadow-[0px_3px_8px_0px_rgba(0,0,0,0.16)]" />
          </div>

          
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-[214px] h-[214px]" viewBox="0 0 214 214">
              <circle
                cx="107"
                cy="107"
                r="85"
                fill="none"
                stroke="#9deb44"
                strokeWidth="30"
                strokeDasharray={`${stats.energyBreakdown.wind * 5.34} 534`}
                transform="rotate(-90 107 107)"
              />
              <circle
                cx="107"
                cy="107"
                r="85"
                fill="none"
                stroke="#fe7f00"
                strokeWidth="30"
                strokeDasharray={`${stats.energyBreakdown.solar * 5.34} 534`}
                strokeDashoffset={-stats.energyBreakdown.wind * 5.34}
                transform="rotate(-90 107 107)"
              />
              <circle
                cx="107"
                cy="107"
                r="85"
                fill="none"
                stroke="#003be3"
                strokeWidth="30"
                strokeDasharray={`${stats.energyBreakdown.hydro * 5.34} 534`}
                strokeDashoffset={-(stats.energyBreakdown.wind + stats.energyBreakdown.solar) * 5.34}
                transform="rotate(-90 107 107)"
              />
              <circle
                cx="107"
                cy="107"
                r="85"
                fill="none"
                stroke="#f34d75"
                strokeWidth="30"
                strokeDasharray={`${stats.energyBreakdown.other * 5.34} 534`}
                strokeDashoffset={-(stats.energyBreakdown.wind + stats.energyBreakdown.solar + stats.energyBreakdown.hydro) * 5.34}
                transform="rotate(-90 107 107)"
              />
            </svg>
          </div>

          {/* Center text */}
          <div className="relative z-10 text-center">
            <p className="font-['Raleway',sans-serif] font-medium text-[16px]">Total</p>
            <p className="font-['Raleway',sans-serif] font-bold text-[21px] text-[#202020]">
              {stats.totalPower}
            </p>
          </div>
        </div>
      </div>

      {/* Energy types */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-3">
          {energyTypes.map((type) => (
            <div
              key={type.name}
              className="h-[25px] rounded-[18px] flex items-center justify-center"
              style={{ backgroundColor: type.color }}
            >
              <p className="font-['Raleway',sans-serif] font-medium text-[15px] text-white text-center">
                {type.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <div className="w-[80px] h-[80px] bg-white rounded-full shadow-[0px_3px_8px_0px_rgba(0,0,0,0.16)] flex items-center justify-center relative mb-2">
              <p className="font-['Raleway',sans-serif] font-medium text-[21px] text-white z-10">
                {stats.activeContracts}
              </p>
              <div className="absolute inset-[5px] bg-[#27693A] rounded-full" />
            </div>
            <p className="font-['Raleway',sans-serif] font-bold text-[13px] text-center text-[#202020]">
              Contratos ativos
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-[80px] h-[80px] bg-white rounded-full shadow-[0px_3px_8px_0px_rgba(0,0,0,0.16)] flex items-center justify-center relative mb-2">
              <p className="font-['Raleway',sans-serif] font-medium text-[21px] text-white z-10">
                {stats.totalInvested / 1000}k
              </p>
              <div className="absolute inset-[5px] bg-[#27693A] rounded-full" />
            </div>
            <p className="font-['Raleway',sans-serif] font-bold text-[13px] text-center text-[#202020]">
              Total investido
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-[80px] h-[80px] bg-white rounded-full shadow-[0px_3px_8px_0px_rgba(0,0,0,0.16)] flex items-center justify-center relative mb-2">
              <p className="font-['Raleway',sans-serif] font-medium text-[21px] text-white z-10">
                {stats.favorites}
              </p>
              <div className="absolute inset-[5px] bg-[#27693A] rounded-full" />
            </div>
            <p className="font-['Raleway',sans-serif] font-bold text-[13px] text-center text-[#202020]">
              Favoritos
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-6">
        <button
          onClick={() => navigate('/contracts')} // O botão já aponta para /contracts, o que é OK!
          className="w-full h-[40px] bg-[#27693a] rounded-[9px] flex items-center justify-center hover:bg-[#1f5230] transition-colors"
        >
          <span className="font-['Nunito_Sans',sans-serif] font-light text-[16px] text-[#f3f3f3]">
            Listar contratos
          </span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}