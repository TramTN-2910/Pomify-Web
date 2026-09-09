import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Globe, Share2, MessageCircle } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-transparent to-purple-50/60 pt-16 pb-12 border-t border-purple-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-purple-100">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src={logoImg}
                alt="Pomify Logo"
                className="w-9 h-9 object-contain"
              />
              <span className="font-extrabold text-xl text-pomify-navy">
                Pomify<span className="text-pomify-purple">.</span>
              </span>
            </div>
            <p className="text-sm text-pomify-subtext leading-relaxed">
              Smart Tech. Cute Vibe. Your AI companion for a smarter, more connected everyday life.
            </p>
            <div className="flex items-center gap-3 text-pomify-purple">
              <a
                href="https://www.facebook.com/share/1DdD8vNSa6/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-sm hover:bg-purple-100/80 hover:border-pomify-purple hover:text-pomify-purple-dark transition-all group flex items-center justify-center"
                title="Official Facebook Page"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-sm hover:bg-purple-100/80 hover:border-pomify-purple hover:text-pomify-purple-dark transition-all" title="Global Community">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-sm hover:bg-purple-100/80 hover:border-pomify-purple hover:text-pomify-purple-dark transition-all" title="Community Hub">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-pomify-navy uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-pomify-subtext font-medium">
              <li><Link to="/" className="hover:text-pomify-purple transition-colors">Home Page</Link></li>
              <li><Link to="/robot" className="hover:text-pomify-purple transition-colors">Our Robot</Link></li>
              <li><Link to="/features" className="hover:text-pomify-purple transition-colors">Features Suite</Link></li>
              <li><Link to="/about" className="hover:text-pomify-purple transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Product & Store Links */}
          <div>
            <h4 className="font-bold text-sm text-pomify-navy uppercase tracking-wider mb-4">Store & Studio</h4>
            <ul className="space-y-2.5 text-sm text-pomify-subtext font-medium">
              <li><Link to="/shop" className="hover:text-pomify-purple transition-colors">Pomify Store</Link></li>
              <li><Link to="/shop/pomify" className="hover:text-pomify-purple transition-colors">Product Specs</Link></li>
              <li><Link to="/customize" className="hover:text-pomify-purple transition-colors">3D Customize Studio</Link></li>
              <li><Link to="/cart" className="hover:text-pomify-purple transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Newsletter / Vibe Note */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-pomify-navy uppercase tracking-wider mb-4">Cute Tech Vibe</h4>
            <div className="p-4 rounded-3xl bg-white/80 border border-purple-100 shadow-sm text-xs text-pomify-subtext space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-pomify-navy">
                <Sparkles className="w-4 h-4 text-pomify-purple" />
                Designed with care
              </div>
              <p>Robot Pomify is engineered for emotional connection, productivity, and warm everyday presence.</p>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-pomify-subtext gap-4">
          <p>© {new Date().getFullYear()} Pomify Web Application. Developed with <Heart className="w-3.5 h-3.5 inline text-pink-400 fill-pink-400" /> by Team Pomify.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-pomify-purple transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-pomify-purple transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
