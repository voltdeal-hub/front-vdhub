import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { api } from "../services/api";
import { toast } from "sonner";

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [cpf, setCpf] = useState("");


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
     

      <div className="flex-1 px-6 py-8">
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 text-[#27693A]"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Voltar</span>
        </button>

        <h1 className="font-['Raleway',sans-serif] font-bold text-[28px] text-[#202020] mb-2">
          Criar uma conta
        </h1>
        <p className="font-['Nunito_Sans',sans-serif] text-[16px] text-[#202020] opacity-70 mb-8">
          Preencha seus dados para começar
        </p>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block font-['Raleway',sans-serif] font-medium text-[14px] text-[#202020] mb-2">
              Nome completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#27693A] focus:border-transparent"
              placeholder="Seu nome"
              required
            />
          </div>

          <div>
            <label className="block font-['Raleway',sans-serif] font-medium text-[14px] text-[#202020] mb-2">
              CPF
            </label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#27693A] focus:border-transparent"
              placeholder="000.000.000-00"
              maxLength={14} // 11 números + 3 pontos + 1 traço
              required
            />
          </div>


          <div>
            <label className="block font-['Raleway',sans-serif] font-medium text-[14px] text-[#202020] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#27693A] focus:border-transparent"
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
              className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#27693A] focus:border-transparent"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block font-['Raleway',sans-serif] font-medium text-[14px] text-[#202020] mb-2">
              Confirmar senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-[50px] px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#27693A] focus:border-transparent"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[61px] bg-[#27693a] rounded-[16px] flex items-center justify-center hover:bg-[#1f5230] transition-colors disabled:opacity-50"
          >
            <span className="font-['Nunito_Sans',sans-serif] font-light text-[22px] text-[#f3f3f3]">
              {loading ? "Criando conta..." : "Criar cadastro"}
            </span>
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-['Nunito_Sans',sans-serif] text-[15px] text-[#27693A]"
            >
              Já tem uma conta? Entre
            </button>
            <p></p>
            <button
              type="button"
              onClick={() => navigate("/RegisterPJ")}
              className="font-['Nunito_Sans',sans-serif] text-[15px] text-[#27693A]"
            >
              Você é uma empresa? Cadastre-se aqui
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
