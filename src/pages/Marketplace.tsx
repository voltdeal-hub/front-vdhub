import { BottomNav } from "../components/BottomNav";

export function Marketplace() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
        
      <h1 className="font-['Raleway',sans-serif] font-bold text-2xl text-center text-[#202020] mb-8">
        Bem vindo a nossa área de busca
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
