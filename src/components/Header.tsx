
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex justify-between items-center py-6 px-4 md:px-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="font-cursive text-3xl md:text-4xl cursor-pointer">td.</div>
      <div className="font-cursive text-xl md:text-2xl">presets</div>
    </header>
  );
};

export default Header;
