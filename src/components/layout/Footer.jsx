import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Heart, Sparkles, Globe, Share2, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-transparent to-purple-50/60 pt-16 pb-12 border-t border-purple-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-purple-100">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pomify-purple to-pomify-blue flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-pomify-navy">
                Pomify<span className="text-pomify-purple">.</span>
              </span>
            </div>
            <p className="text-sm text-pomify-subtext leading-relaxed">
              Smart Tech. Cute Vibe. Your AI companion for a smarter, more connected everyday life.
            </p>
            <div className="flex items-center gap-3 text-pomify-purple">
              <a href="#" className="p-2 rounded-xl bg-white shadow-sm hover:bg-pomify-purple hover:text-white transition-colors" title="Global Web">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-white shadow-sm hover:bg-pomify-purple hover:text-white transition-colors" title="Share Community">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-white shadow-sm hover:bg-pomify-purple hover:text-white transition-colors" title="Chat Channel">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-pomify-navy uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-pomify-subtext font-medium">
              <li><Link to="/" className="hover:text-pomify-purple transition-colors">Meet Pomify</Link></li>
              <li><a href="/#what-is-pomify" className="hover:text-pomify-purple transition-colors">What is Pomify?</a></li>
              <li><a href="/#capabilities" className="hover:text-pomify-purple transition-colors">What Can Pomify Do?</a></li>
              <li><a href="/#why-pomify" className="hover:text-pomify-purple transition-colors">Why Pomify?</a></li>
            </ul>
          </div>

          {/* Product & Showcase */}
          <div>
            <h4 className="font-bold text-sm text-pomify-navy uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-pomify-subtext font-medium">
              <li><Link to="/robot" className="hover:text-pomify-purple transition-colors">Our Robot Showcase</Link></li>
              <li><Link to="/features" className="hover:text-pomify-purple transition-colors">Features Catalog</Link></li>
              <li><Link to="/about" className="hover:text-pomify-purple transition-colors">About Team & Story</Link></li>
              <li><Link to="/customize" className="hover:text-pomify-purple transition-colors">Customize Studio 3D</Link></li>
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
            <a href="#" className="hover:text-pomify-purple">Privacy Policy</a>
            <a href="#" className="hover:text-pomify-purple">Terms of Service</a>
            <a href="#" className="hover:text-pomify-purple">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
