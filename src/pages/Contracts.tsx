
import { BottomNav } from '../components/BottomNav';

export function Contracts() {
  return (
    <div className="min-h-screen bg-white pb-[84px]">
      
      
      <div className="px-6 py-8">
        <h1 className="font-['Raleway',sans-serif] font-bold text-[28px] text-[#202020] mb-6">
          Meus Contratos
        </h1>

        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Você ainda não tem contratos ativos</p>
          <p className="text-sm text-gray-400">
            Explore o marketplace para encontrar as melhores ofertas de energia
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
