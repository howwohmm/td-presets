
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 md:py-16 px-4">
      <div className="flex justify-center items-center space-x-6 md:space-x-12 max-w-5xl mx-auto fade-stagger">
        <span className="text-white/80 text-lg md:text-xl font-light">moj</span>
        <span className="text-white/80 text-lg md:text-xl font-light">masti</span>
        <span className="text-white/80 text-lg md:text-xl font-light">nahi</span>
        <span className="text-white/80 text-lg md:text-xl font-light">rukni</span>
        <span className="text-white/80 text-lg md:text-xl font-light">chahiye</span>
      </div>
    </footer>
  );
};

export default Footer;
