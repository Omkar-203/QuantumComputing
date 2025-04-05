import React, { useState, useEffect } from 'react';
import { Link } from './Link';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
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
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link 
                href="https://aqademy.in" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </Link>
              <Link 
                href="https://aqademy.in/lab" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Lab
              </Link>
              <Link 
                href="https://aqademy.in/courses" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Free Courses
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <a
              href="https://www.amazon.in/Number-Matching-Players-Reverse-colors/dp/B0DLV7KSHS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm"
            >
              Buy Cards
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}