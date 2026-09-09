import React from 'react';

export const Badge = ({
  children,
  variant = 'purple',
  className = '',
  icon: Icon = null,
}) => {
  const variants = {
    purple: 'bg-purple-100 text-pomify-purple-dark border-purple-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    pink: 'bg-pink-100 text-pink-800 border-pink-200',
    mint: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    glass: 'bg-white/60 backdrop-blur-md text-pomify-navy border-white/80',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border shadow-sm ${variants[variant]} ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
};

export default Badge;
