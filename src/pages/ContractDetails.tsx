import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart } from 'lucide-react';
import { api } from '../services/api';
import { toast } from 'sonner';
import type { EnergyContract } from '../types';

export function ContractDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState<EnergyContract | null>(null);
  const [loading, setLoading] = useState(true);
  const [contracting, setContracting] = useState(false);

  useEffect(() => {
    if (id) {
      loadContract(id);
    }
  }, [id]);

  const loadContract = async (contractId: string) => {
    try {
      const response = await api.getContractById(contractId);
      if (response.success) {
        setContract(response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContract = async () => {
    if (!contract) return;

    setContracting(true);
    try {
      const response = await api.createContract(contract.id);
      if (response.success) {
        toast.success('Contrato realizado com sucesso!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Erro ao criar contrato');
    } finally {
      setContracting(false);
    }
  };

  const toggleFavorite = async () => {
    if (!contract) return;

    try {
      await api.toggleFavorite(contract.id);
      setContract({ ...contract, isFavorite: !contract.isFavorite });
      toast.success('Favorito atualizado!');
    } catch (error) {
      toast.error('Erro ao atualizar favorito');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="mb-4">Contrato não encontrado</p>
        <button
          onClick={() => navigate('/marketplace')}
          className="text-[#27693A]"
        >
          Voltar ao marketplace
        </button>
      </div>
    );
  }

  const getEnergyTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      solar: 'Energia Solar',
      wind: 'Energia Eólica',
      hydro: 'Energia Hidrelétrica',
      other: 'Outros'
    };
    return types[type] || 'Energia';
  };

  const getEnergyTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      solar: '#fe7f00',
      wind: '#9deb44',
      hydro: '#003be3',
      other: '#f34d75'
    };
    return colors[type] || '#27693A';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
  
      
      <div className="flex-1 px-6 py-8">
        <button
          onClick={() => navigate('/marketplace')}
          className="mb-8 flex items-center gap-2 text-[#27693A]"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Voltar</span>
        </button>

        {/* Provider Image */}
        <div className="w-full aspect-square max-w-[300px] mx-auto mb-6 bg-gray-200 rounded-[18px] flex items-center justify-center">
          <div className="w-32 h-32 bg-[#27693A] rounded-full" />
        </div>

        {/* Provider Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="font-['Raleway',sans-serif] font-bold text-[28px] text-[#202020] mb-2">
                {contract.providerName}
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-[#ECA61B] text-[#ECA61B]" />
                <span className="font-['Raleway',sans-serif] font-medium text-[16px]">
                  {contract.rating}
                </span>
              </div>
            </div>
            <button onClick={toggleFavorite} className="p-2">
              <Heart
                className={`w-7 h-7 ${
                  contract.isFavorite
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400'
                }`}
              />
            </button>
          </div>

          {/* Energy Type Badge */}
          <div
            className="inline-block px-4 py-2 rounded-[18px] mb-4"
            style={{ backgroundColor: getEnergyTypeColor(contract.type) }}
          >
            <p className="font-['Raleway',sans-serif] font-medium text-[15px] text-white">
              {getEnergyTypeLabel(contract.type)}
            </p>
          </div>

          {/* Description */}
          <p className="font-['Nunito_Sans',sans-serif] text-[16px] leading-[22px] text-black mb-6">
            {contract.description}
          </p>

          {/* Details */}
          <div className="bg-[#f9f9f9] rounded-[10px] p-4 space-y-3">
            <div className="flex justify-between">
              <span className="font-['Raleway',sans-serif] font-medium text-[14px] text-[#202020]">
                Potência:
              </span>
              <span className="font-['Raleway',sans-serif] font-bold text-[14px] text-[#202020]">
                {contract.power}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-['Raleway',sans-serif] font-medium text-[14px] text-[#202020]">
                Preço por KW/h:
              </span>
              <span className="font-['Raleway',sans-serif] font-bold text-[18px] text-[#27693A]">
                R${contract.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Contract Button */}
        <button
          onClick={handleContract}
          disabled={contracting}
          className="w-full h-[61px] bg-[#27693a] rounded-[16px] flex items-center justify-center hover:bg-[#1f5230] transition-colors disabled:opacity-50"
        >
          <span className="font-['Nunito_Sans',sans-serif] font-bold text-[20px] text-[#f3f3f3]">
            {contracting ? 'Contratando...' : 'Contratar Agora'}
          </span>
        </button>
      </div>
    </div>
  );
}
