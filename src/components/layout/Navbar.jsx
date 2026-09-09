import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Menu, X, ArrowRight, ShoppingBag, Palette } from 'lucide-react';
import Button from '../ui/Button';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Meet Pomify', path: '/' },
    { name: 'What is Pomify', path: '/#what-is-pomify' },
    { name: 'Capabilities', path: '/#capabilities' },
    { name: 'Why Pomify', path: '/#why-pomify' },
    { name: 'Our Robot', path: '/robot' },
    { name: 'Features', path: '/features' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 glass-nav shadow-soft-glass' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pomify-purple to-pomify-blue flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
            <Bot className="w-6 h-6 animate-pulse-subtle" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-pomify-navy flex items-center gap-1">
              Pomify <span className="text-pomify-purple text-2xl leading-none">.</span>
            </span>
            <span className="text-[10px] font-semibold text-pomify-purple tracking-widest uppercase -mt-1">
              Smart Tech Vibe
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/80 shadow-sm">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path.startsWith('/#') && location.hash === link.path.replace('/', ''));
            return (
              <a
                key={link.name}
                href={link.path}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-pomify-purple/15 text-pomify-purple-dark font-bold'
                    : 'text-pomify-navy/80 hover:text-pomify-purple hover:bg-white/80'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Actions & Studio CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link to="/customize" title="Trâm's Studio Customize">
            <Button variant="glass" size="sm" icon={Palette}>
              Studio
            </Button>
          </Link>
          <a href="#create">
            <Button variant="primary" size="sm" icon={Sparkles}>
              Get Pomify
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-2xl bg-white/80 text-pomify-navy border border-purple-100 shadow-sm"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-nav border-t border-purple-100 px-6 py-6 shadow-xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-4 rounded-2xl text-sm font-semibold text-pomify-navy hover:bg-pomify-purple/10 hover:text-pomify-purple transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-purple-100/60 flex flex-col gap-3">
                <Link to="/customize" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="glass" size="md" className="w-full" icon={Palette}>
                    Customize Studio
                  </Button>
                </Link>
                <a href="#create" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full" icon={Sparkles}>
                    Create Your Pomify
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
