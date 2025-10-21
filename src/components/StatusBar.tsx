import { Wifi, Signal, Battery } from 'lucide-react';

export function StatusBar() {
  return (
    <div className="h-[44px] px-4 flex items-center justify-between bg-white">
      <p className="font-['Nunito_Sans',sans-serif] font-semibold text-[14px] text-black">
        9:41
      </p>
      
      <div className="flex items-center gap-1.5">
        <Signal className="w-4 h-4 text-black" />
        <Wifi className="w-4 h-4 text-black" />
        <Battery className="w-6 h-3 text-black" />
      </div>
    </div>
  );
}
