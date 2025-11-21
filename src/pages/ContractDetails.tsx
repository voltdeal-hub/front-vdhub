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
  const offerId = Number(id);
  if (!isNaN(offerId)) loadOffer(offerId);
}, [id]);

const loadOffer = async (offerId: number) => {
  const response = await api.getOfferById(offerId);
  if (!response.success) {
    toast.error(response.message);
    setLoading(false);
    return;
  }
  setContract(response.data);
  setLoading(false);
};



  const loadContract = async (contractId: number) => {
    try {
      const response = await api.getContractById(contractId);
      if (!response.success) {
        toast.error(response.message || "Erro ao carregar contrato");
        return;
      }
      setContract(response.data);
    } catch (err) {
      toast.error("Erro ao buscar contrato");
    } finally {
      setLoading(false);
    }
  };


  const handleContract = async () => {
  if (!contract) return;

  setContracting(true);

  const storedCompany = localStorage.getItem("company");
  if (!storedCompany) {
    toast.error("Usuário não logado");
    setContracting(false);
    return;
  }

  const company = JSON.parse(storedCompany);
  const userId = company.id; // <-- use o id retornado do backend

  try {
    const response = await api.createContract(contract, userId);

    if (response.success) {
      toast.success("Contrato realizado com sucesso!");
      navigate("/dashboard");
    } else {
      toast.error(response.message || "Erro ao criar contrato");
    }
  } catch (error) {
    toast.error("Erro ao criar contrato");
  } finally {
    setContracting(false);
  }
};






  const toggleFavorite = async () => {
    if (!contract) return;

    try {
      await api.toggleFavorite(contract.id);

      setContract({ 
        ...contract, 
        isFavorite: !contract.isFavorite 
      });

    } catch {
      toast.error("Erro ao atualizar favorito");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Contrato não encontrado</p>
        <button
          onClick={() => navigate('/marketplace')}
          className="text-[#27693A]"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <div className="px-6 py-8 flex-1 overflow-y-auto">

        <button
          onClick={() => navigate('/dashboard')}
          className="mb-8 flex items-center gap-2 text-[#27693A]"
        >
          <ArrowLeft className="w-6 h-6" />
          Voltar
        </button>

        {/* IMAGEM DO PROVEDOR */}
        <div className="w-full aspect-square max-w-[300px] mx-auto mb-6 bg-gray-200 rounded-[18px]" />

        {/* CABEÇALHO */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{contract.providerName}</h1>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>{contract.rating}</span>
            </div>
          </div>

          <button onClick={toggleFavorite}>
            <Heart
              className={`w-7 h-7 ${
                contract.isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400"
              }`}
            />
          </button>
        </div>

        <p className="mb-6">{contract.description}</p>

        <div className="bg-[#f9f9f9] p-4 rounded-lg mb-8 space-y-3">
          <div className="flex justify-between">
            <span>Potência:</span>
            <span className="font-bold">{contract.power}</span>
          </div>
          <div className="flex justify-between">
            <span>Preço por KW/h:</span>
            <span className="font-bold text-[#27693A] text-lg">
              R${contract.price.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={handleContract}
          disabled={contracting}
          className="w-full h-[61px] bg-[#27693A] text-white rounded-xl"
        >
          {contracting ? "Contratando..." : "Contratar Agora"}
        </button>

      </div>
    </div>
  );
}
