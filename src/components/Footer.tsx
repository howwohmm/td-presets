
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 md:py-16 px-4 relative z-10">
      <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-10 gap-y-3 max-w-5xl mx-auto fade-stagger">
        <span className="text-white/80 text-lg md:text-xl font-light hover:text-white transition-colors duration-300 cursor-default">moj</span>
        <span className="text-white/80 text-lg md:text-xl font-light hover:text-white transition-colors duration-300 cursor-default">masti</span>
        <span className="text-white/80 text-lg md:text-xl font-light hover:text-white transition-colors duration-300 cursor-default">nahi</span>
        <span className="text-white/80 text-lg md:text-xl font-light hover:text-white transition-colors duration-300 cursor-default">rukni</span>
        <span className="text-white/80 text-lg md:text-xl font-light hover:text-white transition-colors duration-300 cursor-default">chahiye</span>
      </div>
      <div className="text-center mt-8 text-white/40 text-sm opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
        Photography presets by teendadniyan © {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
