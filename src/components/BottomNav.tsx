import { Home, MessageCircle, Lightbulb, FileText, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0px_-1px_1px_0px_rgba(0,0,0,0.16)] z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around h-[84px] px-6">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center justify-center gap-1 relative"
          >
            <Home
              className={`w-6 h-6 ${isActive('/') ? 'stroke-[#27693A]' : 'stroke-black'}`}
              strokeWidth={2}
            />
            {isActive('/') && (
              <div className="absolute bottom-0 w-9 h-1 bg-[#27693A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => navigate('/marketplace')}
            className="flex flex-col items-center justify-center gap-1 relative"
          >
            <MessageCircle
              className={`w-6 h-6 ${isActive('/marketplace') ? 'stroke-[#27693A]' : 'stroke-black'}`}
              strokeWidth={2}
            />
            {isActive('/marketplace') && (
              <div className="absolute bottom-0 w-9 h-1 bg-[#27693A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center justify-center gap-1 relative"
          >
            <Lightbulb
              className={`w-6 h-6 ${isActive('/dashboard') ? 'stroke-[#27693A]' : 'stroke-black'}`}
              strokeWidth={2}
            />
            {isActive('/dashboard') && (
              <div className="absolute bottom-0 w-9 h-1 bg-[#27693A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => navigate('/contracts')}
            className="flex flex-col items-center justify-center gap-1 relative"
          >
            <FileText
              className={`w-6 h-6 ${isActive('/contracts') ? 'stroke-[#27693A]' : 'stroke-black'}`}
              strokeWidth={2}
            />
            {isActive('/contracts') && (
              <div className="absolute bottom-0 w-9 h-1 bg-[#27693A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center justify-center gap-1 relative"
          >
            <User
              className={`w-6 h-6 ${isActive('/profile') ? 'stroke-[#27693A]' : 'stroke-black'}`}
              strokeWidth={2}
            />
            {isActive('/profile') && (
              <div className="absolute bottom-0 w-9 h-1 bg-[#27693A] rounded-full" />
            )}
          </button>
        </div>

        
      </div>
    </div>
  );
}
