import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Edit, ShoppingBag, Heart } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { api } from '../services/api';
import { toast } from 'sonner';
import type { EnergyContract } from '../types';

export function Home_app() {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState<EnergyContract[]>([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const response = await api.getOffers();

      if (!response.success) {
        toast.error("Erro ao carregar ofertas.");
        return;
      }

      // Já vem convertido do api.getOffers()
      setContracts(response.data);
    } catch (error) {
      toast.error("Erro ao carregar ofertas");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id: string) => {
    setContracts(contracts.map(c =>
      c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
    ));
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">

      {/* HEADER */}
      <div className="flex-shrink-0">
        <div className="px-6 py-6">
          <h1 className="font-bold text-[28px] text-[#202020] mb-4">
            Contrate energia
          </h1>

          <div className="bg-[#f9f9f9] rounded-[10px] p-4 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-bold text-[14px] text-[#202020] mb-2">
                  Seu endereço:
                </p>
                <p className="text-[10px] leading-[15px] text-black">
                  {user.address || "Endereço não informado"}
                </p>
              </div>
              <button className="w-[30px] h-[30px] bg-[#27693A] rounded-full flex items-center justify-center">
                <Edit className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* BUSCA (SEM FILTRO FUNCIONAL, PARA EVITAR ERROS) */}
        <div className="px-6 mb-4">
          <h2 className="font-bold text-[22px] text-center text-black">Buscar</h2>

          <input
            type="text"
            placeholder="Buscar energia..."
            className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px]"
          />
        </div>
      </div>

      {/* LISTA ROLÁVEL */}
      <div className="flex-1 overflow-y-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[22px] text-black">Energias populares</h2>
        </div>

        {loading ? (
          <p className="text-center py-8">Carregando...</p>
        ) : (
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div key={contract.id} className="bg-white rounded-[9px] shadow p-4">
                <div className="flex gap-4">
                  <div className="w-[117px] h-[111px] bg-gray-200 rounded-[13px]" />

                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-[16px]">{contract.providerName}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-[12px]">{contract.rating}</span>
                        </div>
                      </div>

                      <button onClick={() => toggleFavorite(contract.id)}>
                        <Heart
                          className={`w-5 h-5 ${
                            contract.isFavorite
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>

                    <p className="text-[12px] mb-3">{contract.description}</p>

                    <div className="flex justify-between">
                      <p className="font-bold text-[18px]">R${contract.price}</p>

                      <button
                        onClick={() => navigate(`/contract/${contract.id}`)}
                        className="w-[18px] h-[18px] bg-[#27693A] rounded-full flex items-center justify-center"
                      >
                        <ShoppingBag className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
