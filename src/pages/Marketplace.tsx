import React from 'react';
import { BottomNav } from "../components/BottomNav";

export function Marketplace() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
        
      <h1 className="font-['Raleway',sans-serif] font-bold text-2xl text-center text-[#202020] mb-8">
        Área de Busca
      </h1>

      <div
        className="py-12 px-6 rounded-lg text-center w-full max-w-sm"
        style={{
          backgroundColor: "#f1f8e9",
          border: "1px solid #a5d6a7",
          color: "#27693A",
        }}
      >
        <p className="font-bold text-lg">⚠️ EM DESENVOLVIMENTO ⚠️</p>
      </div>

      <BottomNav />
    </div>
  );
}



/*
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Edit, ShoppingBag, Heart } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { api } from '../services/api';
import { toast } from 'sonner';
import type { EnergyContract } from '../types';

export function Marketplace() {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState<EnergyContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      const response = await api.getContracts();
      if (response.success) {
        setContracts(response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      await api.toggleFavorite(id);
      setContracts(contracts.map(c => 
        c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
      ));
      toast.success('Favorito atualizado!');
    } catch (error) {
      toast.error('Erro ao atualizar favorito');
    }
  };

  const filteredContracts = contracts.filter(contract =>
    contract.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pb-[84px]">
      
      
      {/* Header *
      <div className="px-6 py-6">
        <h1 className="font-['Raleway',sans-serif] font-bold text-[28px] text-[#202020] mb-4">
          Contrate energia
        </h1>

        {/* Address *
        <div className="bg-[#f9f9f9] rounded-[10px] p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="font-['Raleway',sans-serif] font-bold text-[14px] text-[#202020] mb-2">
                Seu endereço:
              </p>
              <p className="font-['Nunito_Sans',sans-serif] text-[10px] leading-[15px] text-black">
                {user.address || 'Avenida, Cais do Apolo, 77, Recife - PE, 50030-220'}
              </p>
            </div>
            <button className="w-[30px] h-[30px] bg-[#27693A] rounded-full flex items-center justify-center">
              <Edit className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Search *
      <div className="px-6 mb-8">
        <div className="relative">
          <div className="w-full h-[105px] bg-white rounded-full shadow-[0px_3px_8px_0px_rgba(0,0,0,0.16)] flex items-center justify-center mb-4">
            <Search className="w-16 h-16 text-[#27693A]" />
          </div>
          <h2 className="font-['Raleway',sans-serif] font-bold text-[22px] text-center text-black">
            Buscar
          </h2>
        </div>

        <div className="mt-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar energia..."
            className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#27693A]"
          />
        </div>
      </div>

      {/* Popular energies *
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['Raleway',sans-serif] font-bold text-[22px] text-black">
            Energias populares
          </h2>
          <button className="flex items-center gap-1 bg-[#27693a] text-white px-3 py-1 rounded-[11px] text-[12px]">
            <span>Favoritos</span>
            <Star className="w-3 h-3 fill-[#ECA61B] text-[#ECA61B]" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p>Carregando...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContracts.map((contract) => (
              <div
                key={contract.id}
                className="bg-white rounded-[9px] shadow-[0px_5px_10px_0px_rgba(0,0,0,0.1)] p-4"
              >
                <div className="flex gap-4">
                  {/* Provider logo placeholder *
                  <div className="w-[117px] h-[111px] bg-gray-200 rounded-[13px] flex items-center justify-center flex-shrink-0">
                    <div className="w-12 h-12 bg-[#27693A] rounded-full" />
                  </div>

                  {/* Content *
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-['Raleway',sans-serif] font-bold text-[16px] text-black mb-1">
                          {contract.providerName}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 fill-[#ECA61B] text-[#ECA61B]" />
                          <span className="text-[12px]">{contract.rating}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(contract.id)}
                        className="p-1"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            contract.isFavorite
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>

                    <p className="font-['Nunito_Sans',sans-serif] text-[12px] leading-[16px] text-black mb-3 line-clamp-2">
                      {contract.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="font-['Raleway',sans-serif] font-bold text-[18px] text-[#202020]">
                        R${contract.price.toFixed(2)}
                      </p>
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

      {/* Total *
      <div className="fixed bottom-[84px] left-0 right-0 bg-[#f9f9f9] h-[60px] px-6 flex items-center justify-between shadow-[0px_-1px_1px_0px_rgba(0,0,0,0.1)]">
        <div>
          <p className="font-['Raleway',sans-serif] font-extrabold text-[20px] text-black">
            Total
          </p>
          <p className="font-['Raleway',sans-serif] font-bold text-[18px] text-[#202020]">
            R$0,00
          </p>
        </div>
        <button className="bg-[#27693a] rounded-[11px] px-8 py-3 hover:bg-[#1f5230] transition-colors">
          <span className="font-['Nunito_Sans',sans-serif] font-bold text-[16px] text-white">
            Contratar
          </span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
*/
