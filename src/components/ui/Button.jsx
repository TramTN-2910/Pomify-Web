import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = '',
  icon: Icon = null,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-300 rounded-full cursor-pointer focus:outline-none select-none';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 via-pomify-purple to-purple-600 text-white shadow-cute-float hover:shadow-glow-purple hover:brightness-110 border border-white/40',
    secondary: 'bg-white/90 backdrop-blur-md text-pomify-navy border border-purple-200 hover:border-pomify-purple shadow-sm hover:shadow-md hover:bg-white',
    pink: 'bg-gradient-to-r from-pink-500 to-pomify-purple text-white font-extrabold shadow-cute-float hover:shadow-glow-purple',
    glass: 'glass-pill text-pomify-navy font-semibold hover:text-pomify-purple-dark hover:border-pomify-purple/40',
    ghost: 'text-pomify-navy hover:text-pomify-purple hover:bg-purple-50/60',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2.5',
    lg: 'px-8 py-4 text-lg gap-3 font-extrabold',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;
