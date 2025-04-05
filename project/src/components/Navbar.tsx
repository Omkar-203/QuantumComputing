import React, { useState, useEffect } from 'react';
import { Share2, Menu, X } from 'lucide-react';

interface NavbarProps {
  onShare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onShare }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 100, 1);
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backgroundColor = `rgba(255, 255, 255, ${0.8 + scrollProgress * 0.2})`;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: 'https://aqademy.in/lab', label: 'Lab' },
    { href: 'https://aqademy.in/courses', label: 'Free Courses' },
  ];

  return (
    <header 
      className="fixed w-full z-50 transition-all duration-300 backdrop-blur-sm shadow-md"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex flex-col items-start">
              <div className="text-sm font-medium tracking-wide text-gray-600">
                Quantum
              </div>
              <div className="text-xs font-medium tracking-wide text-gray-500 -mt-1">
                Computing
              </div>
              <div className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent -mt-1">
                for Dummies
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative text-gray-600 hover:text-blue-500 transition-colors py-2 ${
                    activeLink === link.href ? 'text-blue-500' : ''
                  }`}
                  onClick={() => setActiveLink(link.href)}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform origin-left transition-transform duration-300" />
                  )}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onShare}
              className="px-3 md:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center gap-2 transition-colors text-sm md:text-base"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share Circuit</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 mt-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-600 hover:text-blue-500 transition-colors"
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveLink(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};