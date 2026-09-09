import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SpeechBubble = ({
  text,
  visible = true,
  position = 'top',
  className = '',
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`relative z-20 bg-white/90 backdrop-blur-md border border-purple-100 text-pomify-navy px-5 py-3 rounded-3xl shadow-cute-float text-sm font-medium tracking-wide ${className}`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pomify-purple animate-ping" />
            <span>{text}</span>
          </div>
          
          {/* Bubble Tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/90 border-r border-b border-purple-100 transform rotate-45" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpeechBubble;
