
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 md:py-12 px-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto opacity-0 animate-fade-in-slow" style={{ animationDelay: '0.8s' }}>
        <span className="footer-text">moj</span>
        <span className="footer-text">masti</span>
        <span className="footer-text">nahi</span>
        <span className="footer-text">rukni</span>
        <span className="footer-text">chahiye</span>
      </div>
    </footer>
  );
};

export default Footer;
