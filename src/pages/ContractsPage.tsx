import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { toast } from 'sonner';
import type { EnergyContract } from '../types';
import { Star, ArrowLeft } from 'lucide-react';

export function ContractsPage() {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState<EnergyContract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) {
      toast.error('Usuário não logado');
      setLoading(false);
      return;
    }

    const response = await api.getContracts(user.id);
    if (response.success) {
      setContracts(response.data);
    } else {
      toast.error(response.message || 'Erro ao listar contratos');
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-500 text-lg animate-pulse">Carregando contratos...</span>
      </div>
    );

  if (!contracts.length)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-400 text-lg">Nenhum contrato encontrado.</span>
      </div>
    );

  return (
    <div className="p-6">
      {/* Botão de voltar */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#27693A] mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Voltar</span>
      </button>

      <h1 className="font-['Raleway',sans-serif] font-bold text-2xl text-[#202020] mb-6">
        Meus Contratos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contracts.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-lg text-[#27693A]">{c.providerName}</h2>
              <div className="flex flex-col items-end">
                <div className="flex items-center text-yellow-400 mb-2">
                  <Star className="w-5 h-5 mr-1" />
                  <span className="font-semibold">{c.rating}</span>
                </div>

                {/* Botão Detalhes abaixo da estrela */}
                <button
                    onClick={() => navigate(`/contractdetailpage/${c.id}`)}
                    className="px-3 py-1 bg-[#27693A] text-white rounded-xl text-sm hover:bg-[#1f5230] transition-colors w-full sm:w-auto"
                >
                    Detalhes
                </button>


              </div>
            </div>

            {/* Body */}
            <p className="text-gray-700 mb-2">{c.description}</p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Preço:</span> R${c.price}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Vigência:</span> {c.power}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Energia:</span> {c.type.toUpperCase()}
            </p>

            {/* Footer / Status */}
            <div
              className={`mt-4 px-3 py-1 rounded-full text-sm font-medium text-white w-max ${
                c.rating >= 4 ? 'bg-green-500' : 'bg-gray-400'
              }`}
            >
              {c.rating >= 4 ? 'Ativo' : 'Em análise'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
