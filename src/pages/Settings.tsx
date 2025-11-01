import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Moon, Sun, Save, LifeBuoy } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export function Settings() {
  const navigate = useNavigate();

  // Dados simulados do usuário
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [name, setName] = useState(storedUser.name || '');
  const [email, setEmail] = useState(storedUser.email || '');
  const [cpf, setCpf] = useState(storedUser.cpf || '');
  const [phone, setPhone] = useState(storedUser.phone || '');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    const updatedUser = { ...storedUser, name, email, cpf, phone };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="min-h-screen bg-white pb-[84px]">
      {/* Header */}
      <div className="px-6 py-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-[35px] h-[35px] bg-[#f9f9f9] rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-[#27693A]" />
        </button>
        <h1 className="font-['Raleway',sans-serif] font-bold text-[21px] text-[#202020]">
          Configurações
        </h1>
        <div className="w-[35px]" />
      </div>

      {/* Seção: Conta */}
      <div className="px-6 mb-6">
        <div className="bg-[#f9f9f9] rounded-[18px] p-4">
          <h2 className="font-['Raleway',sans-serif] font-bold text-[17px] text-[#202020] mb-3">
            Conta
          </h2>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block font-['Raleway',sans-serif] text-[14px] text-[#505050] mb-1">
                Nome
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[40px] rounded-[9px] bg-white border border-gray-200 px-3 text-[15px] font-['Raleway',sans-serif]"
              />
            </div>

            <div>
              <label className="block font-['Raleway',sans-serif] text-[14px] text-[#505050] mb-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[40px] rounded-[9px] bg-white border border-gray-200 px-3 text-[15px] font-['Raleway',sans-serif]"
              />
            </div>

            <div>
              <label className="block font-['Raleway',sans-serif] text-[14px] text-[#505050] mb-1">
                CPF
              </label>
              <input
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                maxLength={14}
                placeholder="000.000.000-00"
                className="w-full h-[40px] rounded-[9px] bg-white border border-gray-200 px-3 text-[15px] font-['Raleway',sans-serif]"
              />
            </div>

            <div>
              <label className="block font-['Raleway',sans-serif] text-[14px] text-[#505050] mb-1">
                Telefone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
                className="w-full h-[40px] rounded-[9px] bg-white border border-gray-200 px-3 text-[15px] font-['Raleway',sans-serif]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Seção: Preferências */}
      <div className="px-6 mb-6">
        <div className="bg-[#f9f9f9] rounded-[18px] p-4">
          <h2 className="font-['Raleway',sans-serif] font-bold text-[17px] text-[#202020] mb-3">
            Preferências
          </h2>

          {/* Notificações */}
          <div
            className="flex items-center justify-between py-2 border-b border-gray-200 cursor-pointer"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#27693A]" />
              <span className="font-['Raleway',sans-serif] text-[15px]">Notificações</span>
            </div>
            <div
              className={`w-[40px] h-[22px] rounded-full transition-all ${
                notificationsEnabled ? 'bg-[#27693A]' : 'bg-gray-300'
              } relative`}
            >
              <div
                className={`absolute top-[2px] transition-all ${
                  notificationsEnabled ? 'left-[20px]' : 'left-[2px]'
                } w-[18px] h-[18px] bg-white rounded-full`}
              />
            </div>
          </div>

          {/* Modo escuro */}
          <div
            className="flex items-center justify-between py-2 border-b border-gray-200 cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="w-5 h-5 text-[#27693A]" />
              ) : (
                <Sun className="w-5 h-5 text-[#27693A]" />
              )}
              <span className="font-['Raleway',sans-serif] text-[15px]">Modo escuro</span>
            </div>
            <div
              className={`w-[40px] h-[22px] rounded-full transition-all ${
                darkMode ? 'bg-[#27693A]' : 'bg-gray-300'
              } relative`}
            >
              <div
                className={`absolute top-[2px] transition-all ${
                  darkMode ? 'left-[20px]' : 'left-[2px]'
                } w-[18px] h-[18px] bg-white rounded-full`}
              />
            </div>
          </div>

          {/* ✅ Suporte */}
          <div
            className="flex items-center justify-between py-2 cursor-pointer"
            onClick={() => navigate('/support')}
          >
            <div className="flex items-center gap-3">
              <LifeBuoy className="w-5 h-5 text-[#27693A]" />
              <span className="font-['Raleway',sans-serif] text-[15px]">Suporte</span>
            </div>
            <span className="text-[#27693A] text-[14px] font-medium">Abrir</span>
          </div>
        </div>
      </div>

      {/* Botão Salvar */}
      <div className="px-6">
        <button
          onClick={handleSave}
          className="w-full h-[45px] bg-[#27693A] rounded-[9px] flex items-center justify-center gap-2 hover:bg-[#1f5230] transition-colors"
        >
          <Save className="w-5 h-5 text-white" />
          <span className="font-['Nunito_Sans',sans-serif] font-light text-[16px] text-[#f3f3f3]">
            Salvar alterações
          </span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
