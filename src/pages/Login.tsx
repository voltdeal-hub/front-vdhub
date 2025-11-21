import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { api } from '../services/api';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔥 AGORA CHAMA A API REAL
      const data = await api.login(email, password);

      // data = { id, nome, email, ... }
      toast.success('Login realizado com sucesso!');

      // 🔥 Salva user completo
      localStorage.setItem('user', JSON.stringify(data));

      // 🔥 Navega para home (dashboard ou home_app)
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error?.message || 'Erro ao fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-6 py-8">

        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center gap-2 text-[#27693A]"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Voltar</span>
        </button>

        <h1 className="font-['Raleway',sans-serif] font-bold text-[28px] text-[#202020] mb-2">
          Bem-vindo de volta
        </h1>
        <p className="font-['Nunito_Sans',sans-serif] text-[16px] text-[#202020] opacity-70 mb-8">
          Entre com suas credenciais
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-['Raleway',sans-serif] font-medium text-[14px] text-[#202020] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#27693A]"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block font-['Raleway',sans-serif] font-medium text-[14px] text-[#202020] mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#27693A]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[61px] bg-[#27693a] rounded-[16px] flex items-center justify-center hover:bg-[#1f5230] transition-colors disabled:opacity-50"
          >
            <span className="font-['Nunito_Sans',sans-serif] font-light text-[22px] text-[#f3f3f3]">
              {loading ? 'Entrando...' : 'Entrar'}
            </span>
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="font-['Nunito_Sans',sans-serif] text-[15px] text-[#27693A]"
            >
              Não tem uma conta? Cadastre-se
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
