import React from 'react';
import { Github, Twitter, Mail, Heart, Linkedin } from 'lucide-react';
import { Link } from './Link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold text-gray-900 inline-block">
              |cards⟩ by a<span className="text-pink-500">Q</span>ademy
            </Link>
            <p className="text-gray-600">
              Experience quantum computing concepts through an engaging card game. Learn, play, and master quantum mechanics in a fun way.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://aqademylab1.netlify.app/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="https://aqademylab1.netlify.app/lab" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Lab
                </Link>
              </li>
              <li>
                <Link href="https://aqademylab1.netlify.app/research" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.amazon.in/Number-Matching-Players-Reverse-colors/dp/B0DLV7KSHS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Buy Cards
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/aqademy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/aQademy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/aQademy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="mailto:contact@aqademy.dev"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-100 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} aQademy. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart className="w-4 h-4 mx-1 text-pink-500" /> by the aQademy team
          </p>
        </div>
      </div>
    </footer>
  );
}