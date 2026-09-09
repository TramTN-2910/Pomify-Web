import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({
  children,
  className = '',
  hoverEffect = true,
  glowColor = 'purple',
  onClick,
  ...props
}) => {
  const glowStyles = {
    purple: 'hover:shadow-glow-purple',
    mint: 'hover:shadow-glow-mint',
    none: '',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hoverEffect ? { y: -6, scale: 1.01 } : {}}
      onClick={onClick}
      className={`glass-card rounded-4xl p-6 md:p-8 transition-all duration-300 ${glowStyles[glowColor]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
