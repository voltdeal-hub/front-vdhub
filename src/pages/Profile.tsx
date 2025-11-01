import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, MapPin, Mail, Phone, FileText, Headphones, Bell, Settings as SettingsIcon, Edit3 } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export function Profile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

  const [user, setUser] = useState(storedUser);
  const [avatar, setAvatar] = useState(storedUser.avatar || '');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
        const updatedUser = { ...user, avatar: reader.result };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-[84px]">
      {/* Header */}
      <div className="px-6 py-6 flex items-center justify-between">
        <h1 className="font-['Raleway',sans-serif] font-bold text-[28px] text-[#202020]">
          Perfil
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

      <div className="px-6 py-8">
        {/* User Info with avatar and edit button */}
        <div className="flex flex-col items-center gap-4 mb-8 relative">
          <div className="relative w-[80px] h-[80px]">
            <img
              src={avatar}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full bg-gradient-to-br from-[#27693A] to-[#1f5230]"
            />
            {!avatar && (
              <User className="absolute w-10 h-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            )}
            {/* Edit icon */}
            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-2 -right-2 w-[28px] h-[28px] bg-white rounded-full flex items-center justify-center shadow cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-[#27693A]" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              style={{ display: 'none' }}
            />
          </div>

          <h2 className="font-['Raleway',sans-serif] font-bold text-[24px] text-[#202020]">
            {user.name || 'Usuário'}
          </h2>
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
            <Phone className="w-5 h-5 text-[#27693A] mt-1" />
            <div>
              <p className="font-['Raleway',sans-serif] font-medium text-[14px] text-[#202020] mb-1">
                Telefone
              </p>
              <p className="font-['Nunito_Sans',sans-serif] text-[14px] text-black">
                {user.phone || '(00) 00000-0000'}
              </p>
            </div>
          </div>

          <div className="bg-[#f9f9f9] rounded-[10px] p-4 flex items-start gap-3">
            <FileText className="w-5 h-5 text-[#27693A] mt-1" />
            <div>
              <p className="font-['Raleway',sans-serif] font-medium text-[14px] text-[#202020] mb-1">
                CPF
              </p>
              <p className="font-['Nunito_Sans',sans-serif] text-[14px] text-black">
                {user.cpf || '000.000.000-00'}
              </p>
            </div>
          </div>

          <div className="bg-[#f9f9f9] rounded-[10px] p-4 flex items-start gap-3 cursor-pointer" onClick={() => navigate('/support')}>
            <Headphones className="w-5 h-5 text-[#27693A] mt-1" />
            <div>
              <p className="font-['Raleway',sans-serif] font-medium text-[14px] text-[#202020] mb-1">
                Suporte
              </p>
              <p className="font-['Nunito_Sans',sans-serif] text-[12px] text-black">
                Fale com a nossa equipe de suporte
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
