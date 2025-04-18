
import React, { useState } from 'react';
import LoginDialog from './LoginDialog';
import AdminPresetDialog from './AdminPresetDialog';
import { useAuth } from '@/hooks/useAuth';

const Header: React.FC = () => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const handleLoginSuccess = () => {
    setIsLoginDialogOpen(false);
    setIsAdminDialogOpen(true);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="w-full flex justify-between items-center py-6 px-4 md:px-8 fade-in">
      <div 
        className="font-serif text-xl md:text-2xl cursor-pointer text-white hover:opacity-80 transition-opacity flex items-center gap-2"
        onClick={() => !isLoggedIn ? setIsLoginDialogOpen(true) : setIsAdminDialogOpen(true)}
      >
        td.
        {isLoggedIn && (
          <span className="text-xs text-white/70 font-sans">(admin)</span>
        )}
      </div>
      
      {isLoggedIn && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAdminDialogOpen(true)}
            className="text-sm border-b border-white/60 hover:border-white text-white/90 hover:text-white pb-0.5 transition-colors"
          >
            Add Preset
          </button>
          <button 
            onClick={handleLogout}
            className="text-sm border-b border-white/60 hover:border-white text-white/90 hover:text-white pb-0.5 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
      
      <div className="font-serif text-xl md:text-2xl text-white">presets</div>

      <LoginDialog 
        isOpen={isLoginDialogOpen} 
        onClose={() => setIsLoginDialogOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
      
      <AdminPresetDialog 
        isOpen={isAdminDialogOpen} 
        onClose={() => setIsAdminDialogOpen(false)} 
      />
    </header>
  );
};

export default Header;
