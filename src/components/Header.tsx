
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
    <header className="w-full flex justify-between items-center py-6 px-4 md:px-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div 
        className="font-cursive text-3xl md:text-4xl cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2"
        onClick={() => !isLoggedIn ? setIsLoginDialogOpen(true) : setIsAdminDialogOpen(true)}
      >
        td.
        {isLoggedIn && (
          <span className="text-sm text-teendad-text/70 font-sans">(admin)</span>
        )}
      </div>
      
      {isLoggedIn && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAdminDialogOpen(true)}
            className="text-sm border-b border-teendad-text/60 hover:border-teendad-text pb-0.5 transition-colors"
          >
            Add Preset
          </button>
          <button 
            onClick={handleLogout}
            className="text-sm border-b border-teendad-text/60 hover:border-teendad-text pb-0.5 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
      
      <div className="font-cursive text-xl md:text-2xl">presets</div>

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
