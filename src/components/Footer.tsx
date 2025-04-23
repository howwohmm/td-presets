
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 md:py-16 px-4">
      <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-10 gap-y-3 max-w-5xl mx-auto fade-stagger">
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
