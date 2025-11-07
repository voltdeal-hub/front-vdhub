import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bolt, TrendingUp, TrendingDown, Bell, Settings as SettingsIcon, Search, Zap, ShoppingBag } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export function Home_app() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

  const [user, setUser] = useState(storedUser);
  const [energyBalance, setEnergyBalance] = useState(230.5); // kWh
  const [marketPrice, setMarketPrice] = useState(0.65); // R$/kWh
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'compra', value: 120, date: '07/11/2025', price: 78.0 },
    { id: 2, type: 'venda', value: 50, date: '06/11/2025', price: 32.5 },
  ]);

  useEffect(() => {
    setUser(storedUser);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-[84px]">
      {/* Header */}
      <div className="px-6 py-6 flex items-center justify-between">
        <h1 className="font-['Raleway',sans-serif] font-bold text-[28px] text-[#202020]">
          Olá, {user.name?.split(' ')[0] || 'usuário'}
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/notifications")}
            className="relative w-[35px] h-[35px] bg-[#f9f9f9] rounded-full flex items-center justify-center"
          >
            <Bell className="w-5 h-5 text-[#27693A]" />
            <div className="absolute top-0 right-0 w-[8px] h-[8px] bg-[#ECA61B] rounded-full border-2 border-white" />
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="w-[35px] h-[35px] bg-[#f9f9f9] rounded-full flex items-center justify-center"
          >
            <SettingsIcon className="w-5 h-5 text-[#27693A]" />
          </button>
        </div>
      </div>

      {/* Energy Summary */}
      <div className="px-6">
        <div className="bg-gradient-to-br from-[#27693A] to-[#1f5230] rounded-[16px] p-6 text-white flex flex-col gap-2 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-['Nunito_Sans',sans-serif] opacity-90">Saldo energético</p>
            <Bolt className="w-5 h-5 text-[#ECA61B]" />
          </div>
          <h2 className="text-[32px] font-bold">{energyBalance} kWh</h2>
          <p className="text-[14px] opacity-80">
            Valor estimado: R$ {(energyBalance * marketPrice).toFixed(2)}
          </p>
        </div>

        {/* Market Info */}
        <div className="bg-[#f9f9f9] rounded-[12px] p-4 mb-6 flex items-center justify-between">
          <div>
            <p className="font-['Raleway',sans-serif] font-medium text-[14px] text-[#202020] mb-1">Preço atual do kWh</p>
            <p className="font-['Nunito_Sans',sans-serif] text-[18px] font-semibold text-[#27693A]">R$ {marketPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={() => navigate('/market')}
            className="bg-[#27693A] text-white rounded-[8px] px-4 py-2 text-[14px] font-medium hover:opacity-90 transition"
          >
            Ver mercado
          </button>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Buscar produtores ou ofertas..."
            className="w-full h-[44px] bg-[#f9f9f9] rounded-[10px] pl-10 pr-4 text-[14px] font-['Nunito_Sans',sans-serif] focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#27693A] w-5 h-5" />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate('/buy')}
            className="bg-[#f1fdf5] border border-[#27693A]/20 rounded-[10px] py-4 flex flex-col items-center justify-center gap-2 hover:bg-[#e5f8ec] transition"
          >
            <TrendingUp className="w-6 h-6 text-[#27693A]" />
            <span className="text-[#202020] text-[14px] font-medium font-['Raleway',sans-serif]">
              Comprar energia
            </span>
          </button>

          <button
            onClick={() => navigate('/sell')}
            className="bg-[#fff7ed] border border-[#ECA61B]/30 rounded-[10px] py-4 flex flex-col items-center justify-center gap-2 hover:bg-[#ffefdc] transition"
          >
            <TrendingDown className="w-6 h-6 text-[#ECA61B]" />
            <span className="text-[#202020] text-[14px] font-medium font-['Raleway',sans-serif]">
              Vender energia
            </span>
          </button>
        </div>

        {/* Transaction History */}
        <div className="mb-8">
          <h3 className="font-['Raleway',sans-serif] font-bold text-[18px] mb-3 text-[#202020]">
            Últimas transações
          </h3>

          <div className="space-y-3">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="bg-[#f9f9f9] rounded-[10px] p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {t.type === 'compra' ? (
                    <Zap className="w-5 h-5 text-[#27693A]" />
                  ) : (
                    <ShoppingBag className="w-5 h-5 text-[#ECA61B]" />
                  )}
                  <div>
                    <p className="font-['Raleway',sans-serif] text-[14px] font-medium text-[#202020] capitalize">
                      {t.type}
                    </p>
                    <p className="font-['Nunito_Sans',sans-serif] text-[12px] text-gray-500">
                      {t.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-['Nunito_Sans',sans-serif] text-[14px] font-semibold">
                    {t.value} kWh
                  </p>
                  <p className="text-[12px] text-gray-500">R$ {t.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
