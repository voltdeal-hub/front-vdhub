import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import VoltDealLogoImg from '../assets/logo-voltdeal.png';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <StatusBar />
      
      {/* (Logo no topo, Tagline no centro, Buttons embaixo) */}
      <div className="flex-1 flex flex-col items-center justify-between px-6 py-12">
        
        {/* Centraliza o Logo e o Tagline na tela */}
        <div className="flex-1 flex flex-col items-center justify-center">
          
          {/* Logo Container (Bolha Branca Externa) */}
          <div className="relative w-[215px] h-[215px] mb-8">
            
            {/* Fundo Branco e Sombra */}
            <div className="absolute inset-0 bg-white rounded-full shadow-[0px_3px_8px_0px_rgba(0,0,0,0.16)]" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Círculo Interno Verde */}
              <div className="w-[191px] h-[191px] relative">
                
                <div className="absolute inset-0 bg-[#27693A] rounded-full flex items-center justify-center">
                  
                  <img 
                    src={VoltDealLogoImg} 
                    alt="Logo VoltDeal" 
                    className="w-full h-full object-contain p-8 rounded-full" 
                  />
                </div>

                <p className="absolute bottom-4 left-0 right-0 text-center font-bold text-2xl text-[#202020]">
                  VoltDeal
                </p>

              </div>
            </div>
          </div>
          
          {/* Tagline */}
          <p className="text-[19px] leading-[33px] text-center text-[#202020] max-w-[249px] font-['Nunito_Sans',sans-serif] font-light mb-16">
            O primeiro marketplace de energia do Brasil
          </p>
          
        </div>

        {/* Buttons */}
        <div className="w-full max-w-[335px] space-y-6">
          <button
            onClick={() => navigate('/register')}
            className="w-full h-[61px] bg-[#27693a] rounded-[16px] flex items-center justify-center hover:bg-[#1f5230] transition-colors"
          >
            <span className="font-['Nunito_Sans',sans-serif] font-light text-[22px] leading-[31px] text-[#f3f3f3]">
              Criar um cadastro
            </span>
          </button>

          <button
            onClick={() => navigate('/login')}
            className="flex items-center justify-center gap-3 mx-auto"
          >
            <span className="font-['Nunito_Sans',sans-serif] font-light text-[15px] leading-[26px] text-[#202020] opacity-90">
              Já possuo uma conta
            </span>
            <div className="w-[30px] h-[30px] bg-[#27693A] rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3" fill="white" viewBox="0 0 15 12">
                <path d="M8.58262 0L7.40296 1.20374L11.1586 4.85104H0V6.53627H11.1586L7.40296 10.1836L8.58262 11.3873L14.4568 5.69366L8.58262 0Z" />
              </svg>
            </div>
          </button>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center mt-4">
          <div className="w-[134px] h-[5px] bg-black rounded-full" />
        </div>
      </div>
    </div>
  );
}