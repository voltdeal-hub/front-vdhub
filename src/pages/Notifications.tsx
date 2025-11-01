import { ArrowLeft, CheckCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";

export function Notifications() {
  const navigate = useNavigate();

  // Exemplo de notificações simuladas
  const notifications = [
    {
      id: 1,
      type: "info",
      title: "Atualização de sistema",
      message: "O app foi atualizado para a versão 1.2.3.",
      date: "31/10/2025",
    },
    {
      id: 2,
      type: "success",
      title: "Pagamento aprovado",
      message: "Seu pagamento do plano Premium foi confirmado.",
      date: "29/10/2025",
    },
  ];

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
          Notificações
        </h1>
        <div className="w-[35px]" /> {/* espaçamento */}
      </div>

      {/* Lista de notificações */}
      <div className="px-6 flex flex-col gap-3">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              className="bg-[#f9f9f9] rounded-[12px] p-4 flex items-start gap-3 shadow-sm"
            >
              {n.type === "success" ? (
                <CheckCircle className="w-6 h-6 text-[#27693A] mt-1" />
              ) : (
                <Info className="w-6 h-6 text-[#ECA61B] mt-1" />
              )}
              <div>
                <h3 className="font-['Raleway',sans-serif] font-semibold text-[16px] text-[#202020]">
                  {n.title}
                </h3>
                <p className="text-[14px] text-[#505050] mb-1">{n.message}</p>
                <span className="text-[12px] text-gray-400">{n.date}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            Nenhuma notificação por enquanto.
          </p>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
