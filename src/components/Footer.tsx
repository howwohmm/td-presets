
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-12 md:py-16 px-4 relative z-10">
      <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-10 gap-y-3 max-w-5xl mx-auto fade-stagger">
        <span className="text-white/80 text-lg md:text-xl font-light hover:text-white transition-colors duration-300 cursor-default animate-float" style={{ animationDelay: "0s" }}>moj</span>
        <span className="text-white/80 text-lg md:text-xl font-light hover:text-white transition-colors duration-300 cursor-default animate-float" style={{ animationDelay: "0.3s" }}>masti</span>
        <span className="text-white/80 text-lg md:text-xl font-light hover:text-white transition-colors duration-300 cursor-default animate-float" style={{ animationDelay: "0.6s" }}>nahi</span>
        <span className="text-white/80 text-lg md:text-xl font-light hover:text-white transition-colors duration-300 cursor-default animate-float" style={{ animationDelay: "0.9s" }}>rukni</span>
        <span className="text-white/80 text-lg md:text-xl font-light hover:text-white transition-colors duration-300 cursor-default animate-float" style={{ animationDelay: "1.2s" }}>chahiye</span>
      </div>
      <div className="text-center mt-8 text-white/40 text-sm opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
        <p className="mb-2">Photography presets by teendadniyan © {currentYear}</p>
        <p className="text-xs text-white/30">Made with ❤️ and a bit of magic</p>
      </div>
    </footer>
  );
};

export default Footer;
