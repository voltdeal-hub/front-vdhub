import { useNavigate } from 'react-router-dom';
import { LogOut, User, MapPin, Mail } from 'lucide-react';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';

export function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white pb-[84px]">
      <StatusBar />
      
      <div className="px-6 py-8">
        <h1 className="font-['Raleway',sans-serif] font-bold text-[28px] text-[#202020] mb-8">
          Perfil
        </h1>

        {/* User Info */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-[80px] h-[80px] bg-gradient-to-br from-[#27693A] to-[#1f5230] rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="font-['Raleway',sans-serif] font-bold text-[24px] text-[#202020]">
              {user.name || 'Usuário'}
            </h2>
          </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-4 mb-8">
          <div className="bg-[#f9f9f9] rounded-[10px] p-4 flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#27693A] mt-1" />
            <div>
              <p className="font-['Raleway',sans-serif] font-medium text-[14px] text-[#202020] mb-1">
                Email
              </p>
              <p className="font-['Nunito_Sans',sans-serif] text-[14px] text-black">
                {user.email || 'email@exemplo.com'}
              </p>
            </div>
          </div>

          <div className="bg-[#f9f9f9] rounded-[10px] p-4 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#27693A] mt-1" />
            <div>
              <p className="font-['Raleway',sans-serif] font-medium text-[14px] text-[#202020] mb-1">
                Endereço
              </p>
              <p className="font-['Nunito_Sans',sans-serif] text-[12px] leading-[16px] text-black">
                {user.address || 'Avenida, Cais do Apolo, 77, Recife - PE, 50030-220'}
              </p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full h-[50px] border-2 border-red-500 text-red-500 rounded-[10px] flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-['Nunito_Sans',sans-serif] font-medium text-[16px]">
            Sair da conta
          </span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
