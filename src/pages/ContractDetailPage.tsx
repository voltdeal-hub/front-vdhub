import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { toast } from 'sonner';
import type { EnergyContract } from '../types';
import { ArrowLeft, Download } from 'lucide-react';


export function ContractDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [contract, setContract] = useState<EnergyContract | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (id) loadContract(Number(id));
  }, [id]);

  const loadContract = async (contractId: number) => {
    setLoading(true);
    const response = await api.getContractById(contractId);
    if (response.success) {
      setContract(response.data);
    } else {
      toast.error(response.message || 'Erro ao buscar contrato');
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    if (!contract) return;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) {
        toast.error('Usuário não logado');
        return;
    }

    setDownloading(true);
    try {
        const blob = await api.generateContractPreview(
        {
            id: user.id,
            nome_empresa: user.nome_empresa,
            nome_responsavel: user.nome_responsavel,
            email: user.email,
            cnpj: user.cnpj
        },
        {
            id: Number(contract.id),
            nome_fornecedor: contract.providerName,
            nome_plano: contract.description,
            preco_kwh: contract.price,
            fonte_energia: contract.type,
            prazo_vigencia_meses: Number(contract.power.replace(/\D/g, ''))
        }
        );

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Contrato_${contract.providerName}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);

    } catch (err: any) {
        toast.error(err.message || 'Erro ao baixar contrato');
    } finally {
        setDownloading(false);
    }
    };


  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-500 text-lg animate-pulse">Carregando contrato...</span>
      </div>
    );

  if (!contract)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-400 text-lg">Contrato não encontrado.</span>
      </div>
    );

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#27693A] mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Voltar</span>
      </button>

      <h1 className="font-bold text-2xl text-[#202020] mb-4">{contract.providerName}</h1>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Plano:</span> {contract.description}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Preço:</span> R${contract.price}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Vigência:</span> {contract.power}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Fonte de energia:</span> {contract.type.toUpperCase()}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Status:</span> {contract.rating >= 4 ? 'Ativo' : 'Em análise'}
      </p>
      <p className="text-gray-500 text-sm mt-2">
        Criado em: {new Date(contract.data_criacao || '').toLocaleDateString()}
      </p>

      <button
        onClick={handleDownload}
        disabled={downloading}
        className="mt-6 px-4 py-2 bg-[#27693A] text-white rounded-xl flex items-center gap-2 hover:bg-[#1f5230] transition-colors"
      >
        <Download className="w-5 h-5" />
        {downloading ? 'Baixando...' : 'Baixar Contrato'}
      </button>
    </div>
  );
}
