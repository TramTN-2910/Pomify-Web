import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Palette, User, LogIn, LogOut, Package, ShieldCheck, LayoutDashboard } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import Button from '../ui/Button';
import useCartStore from '../../features/shop/store/cartStore';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  const { getCartCount } = useCartStore();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const adminToken = localStorage.getItem('pomify_admin_token');
      const adminUser = localStorage.getItem('pomify_admin_user');
      const customerToken = localStorage.getItem('pomify_customer_token');
      const customerUser = localStorage.getItem('pomify_customer_user');

      if (adminToken) {
        setIsAdmin(true);
        try {
          setCurrentUser(adminUser ? JSON.parse(adminUser) : { name: 'Pomify Admin', email: 'admin@pomify.vn' });
        } catch (e) {
          setCurrentUser({ name: 'Pomify Admin', email: 'admin@pomify.vn' });
        }
      } else if (customerToken) {
        setIsAdmin(false);
        try {
          setCurrentUser(customerUser ? JSON.parse(customerUser) : { name: 'Pomify User', email: 'customer@pomify.ai' });
        } catch (e) {
          setCurrentUser({ name: 'Pomify User', email: 'customer@pomify.ai' });
        }
      } else {
        setIsAdmin(false);
        setCurrentUser(null);
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    window.addEventListener('pomify_auth_change', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('pomify_auth_change', checkAuth);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('pomify_admin_token');
    localStorage.removeItem('pomify_admin_user');
    localStorage.removeItem('pomify_customer_token');
    localStorage.removeItem('pomify_customer_user');
    setCurrentUser(null);
    setIsAdmin(false);
    setUserDropdownOpen(false);
    window.dispatchEvent(new Event('pomify_auth_change'));
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Robot', path: '/robot' },
    { name: 'Features', path: '/features' },
    { name: 'Store', path: '/shop' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 glass-nav shadow-soft-glass' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={logoImg}
            alt="Pomify Logo"
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
          />
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
            return link.path.startsWith('/#') ? (
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
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-pomify-purple/15 text-pomify-purple-dark font-bold'
                    : 'text-pomify-navy/80 hover:text-pomify-purple hover:bg-white/80'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions, Cart & User Profile CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          
          <Link to="/customize" title="Pomify 3D Customize Studio">
            <Button variant="glass" size="sm" icon={Palette}>
              Studio
            </Button>
          </Link>

          {/* Cart Icon Link */}
          <Link to="/cart" className="relative p-2.5 rounded-full bg-white/80 border border-purple-100 shadow-sm hover:border-pomify-purple text-pomify-navy hover:text-pomify-purple transition-all" title="View Cart">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-purple-600 text-white text-[11px] font-black flex items-center justify-center border-2 border-white shadow-md z-10">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Profile / Auth Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className={`p-2.5 rounded-full border shadow-sm transition-all flex items-center gap-1.5 ${
                currentUser
                  ? isAdmin
                    ? 'bg-purple-100 border-purple-300 text-pomify-purple'
                    : 'bg-blue-100 border-blue-300 text-blue-700'
                  : 'bg-white/80 border-purple-100 text-pomify-navy hover:text-pomify-purple'
              }`}
              title="User Account"
            >
              {isAdmin ? <ShieldCheck className="w-5 h-5 text-pomify-purple" /> : <User className="w-5 h-5" />}
            </button>

            <AnimatePresence>
              {userDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-purple-100 rounded-2xl shadow-xl p-2 z-50 text-left"
                >
                  {currentUser ? (
                    <div className="space-y-1">
                      <div className="px-3 py-2 border-b border-purple-50">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-pomify-navy truncate max-w-[130px]">{currentUser.name}</div>
                          {isAdmin && (
                            <span className="px-1.5 py-0.5 rounded bg-purple-100 text-[10px] font-bold text-pomify-purple">
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-pomify-subtext truncate">{currentUser.email}</div>
                      </div>

                      {isAdmin ? (
                        <>
                          <Link
                            to="/admin/orders"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-pomify-purple hover:bg-purple-50"
                          >
                            <Package className="w-4 h-4 text-pomify-purple" /> Manage Orders
                          </Link>
                          <Link
                            to="/admin/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-pomify-navy hover:bg-purple-50"
                          >
                            <LayoutDashboard className="w-4 h-4 text-pomify-purple" /> Admin Dashboard
                          </Link>
                        </>
                      ) : (
                        <Link
                          to="/orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-pomify-navy hover:bg-purple-50"
                        >
                          <Package className="w-4 h-4 text-pomify-purple" /> My Orders
                        </Link>
                      )}

                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 border-t border-purple-50 mt-1"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Link
                        to="/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-pomify-navy hover:bg-purple-50"
                      >
                        <LogIn className="w-4 h-4 text-pomify-purple" /> Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-pomify-purple-dark hover:bg-purple-50"
                      >
                        <User className="w-4 h-4 text-pomify-purple" /> Create Account
                      </Link>
                      <div className="border-t border-purple-50 my-1 pt-1">
                        <Link
                          to="/admin/login"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-pomify-purple hover:bg-purple-50"
                        >
                          <ShieldCheck className="w-4 h-4 text-pomify-purple" /> Admin Portal
                        </Link>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path.startsWith('/#') && location.hash === link.path.replace('/', ''));
                return link.path.startsWith('/#') ? (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2.5 px-4 rounded-2xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-pomify-purple/15 text-pomify-purple-dark font-bold'
                        : 'text-pomify-navy hover:bg-pomify-purple/10 hover:text-pomify-purple'
                    }`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2.5 px-4 rounded-2xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-pomify-purple/15 text-pomify-purple-dark font-bold'
                        : 'text-pomify-navy hover:bg-pomify-purple/10 hover:text-pomify-purple'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-purple-100/60 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                    <Button variant="secondary" size="md" className="w-full" icon={ShoppingBag}>
                      Cart ({cartCount})
                    </Button>
                  </Link>
                  <Link to={currentUser ? (isAdmin ? '/admin/orders' : '/orders') : '/login'} onClick={() => setMobileMenuOpen(false)} className="flex-1">
                    <Button variant="glass" size="md" className="w-full" icon={currentUser ? User : LogIn}>
                      {currentUser ? 'Account' : 'Sign In'}
                    </Button>
                  </Link>
                </div>
                <Link to="/customize" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="glass" size="md" className="w-full" icon={Palette}>
                    Customize Studio
                  </Button>
                </Link>
                <Link to="/admin/orders" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full text-xs text-pomify-purple border-purple-200" icon={ShieldCheck}>
                    Admin Order Management
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
