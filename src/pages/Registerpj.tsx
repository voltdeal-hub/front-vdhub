import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { StatusBar } from '../components/StatusBar';
import { api } from '../services/api';
import { toast } from 'sonner';

export function Register() {
  const navigate = useNavigate();
  const [cnpj, setCnpj] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setLoading(true);

    try {
      const response = await api.register(name, email, password);
      if (response.success) {
        toast.success("Cadastro realizado com sucesso!");
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Erro ao criar cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <StatusBar />

      <div className="flex-1 px-6 py-8">
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 text-[#27693A]"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Voltar</span>
        </button>

        <h1 className="font-['Raleway',sans-serif] font-bold text-[28px] text-[#202020] mb-2">
          Criar conta Empresarial
        </h1>
        <p className="font-['Nunito_Sans',sans-serif] text-[16px] text-[#202020] opacity-70 mb-8">
          Preencha os dados da sua Empresarial
        </p>
    
    return (
    <div className="min-h-screen bg-white flex flex-col">
      <StatusBar />
      <div className="flex-1 px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-[#27693A]"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Voltar</span>
        </button>
        <h1 className="font-['Raleway',sans-serif] font-bold text-[28px] text-[#202020] mb-2">
          Criar conta Empresarial
        </h1>
        <p className="font-['Nunito_Sans',sans-serif] text-[16px] text-[#202020] opacity-70 mb-8">
          Preencha os dados da sua empresa
        </p>
        <form onSubmit={handleRegisterPJ} className="space-y-6">
          <input value={razaoSocial} 
          onChange={(e) => setRazaoSocial(e.target.value)} 
          placeholder="Razão Social" 
          required 
          className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px]" />
          
          <input value={cnpj} 
          onChange={(e) => setCnpj(e.target.value)} 
          placeholder="CNPJ" 
          required 
          className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px]" />
          
          <input type="tel" value={celular} 
          onChange={(e) => setCelular(e.target.value)} 
          placeholder="N° Celular" 
          required 
          className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px]" />
          
          <input type="email" 
          value={email} onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
          className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px]" />
          
          <input value={endereco} 
          onChange={(e) => setEndereco(e.target.value)} 
          placeholder="Endereço" 
          required 
          className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px]" />
          
          <input type="password" value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Criar Senha" 
          required 
          minLength={6} 
          className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px]" />
          
          <input type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Repetir Senha" 
          required 
          minLength={6} 
          className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px]" />
          
          <button type="submit" disabled={loading} className="w-full h-[61px] bg-[#27693a] rounded-[16px] text-white">
            {loading ? "Criando conta..." : "Criar cadastro PJ"}
          </button>
        </form>
      </div>
    </div>
  )