import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, Palette, ArrowLeft, Bot, Sparkles, HelpCircle, Compass } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/ui/Button';

export const NotFoundPage = () => {
  return (
    <PageContainer className="flex items-center justify-center min-h-[calc(100vh-5rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full mx-auto text-center space-y-8">
        
        {/* Animated Robot Graphics & 404 Badge */}
        <div className="relative flex justify-center items-center py-4">
          {/* Glowing Ambient Backdrop */}
          <div className="absolute w-72 h-72 bg-gradient-to-tr from-pomify-purple/30 via-pomify-blue/20 to-pink-300/30 rounded-full blur-3xl -z-10 animate-pulse-subtle" />
          
          {/* Main Card Graphic */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            className="relative bg-white/70 backdrop-blur-xl border border-white/80 p-8 sm:p-12 rounded-[36px] shadow-soft-glass max-w-lg w-full flex flex-col items-center"
          >
            {/* Cute Floating Robot Avatar */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-pomify-purple to-pomify-purple-dark text-white flex items-center justify-center shadow-lg shadow-purple-500/25 mb-6 border-4 border-white"
            >
              <Bot className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-md" />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-2 -right-2 p-2 rounded-2xl bg-amber-300 text-pomify-navy shadow-md border-2 border-white"
              >
                <Sparkles className="w-5 h-5 fill-amber-400 text-amber-600" />
              </motion.div>
            </motion.div>

            {/* 404 Pill Badge */}
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pomify-purple/15 text-pomify-purple-dark font-extrabold text-sm tracking-wider uppercase mb-3 border border-pomify-purple/20">
              Error 404 — Lost in Space 🚀
            </span>

            {/* Title & Description */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-pomify-navy tracking-tight mb-3">
              Ối! Trang này không tồn tại
            </h1>
            <p className="text-sm sm:text-base text-pomify-subtext leading-relaxed max-w-md">
              Có vẻ như robot Pomify vừa điều hướng nhầm sang tọa độ vũ trụ khác. Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
            </p>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto"
        >
          <Link to="/">
            <Button variant="primary" size="lg" icon={Home} className="shadow-lg shadow-purple-500/20">
              Trở về Trang Chủ
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="secondary" size="lg" icon={ShoppingBag}>
              Ghé Cửa Hàng
            </Button>
          </Link>
          <Link to="/customize">
            <Button variant="glass" size="lg" icon={Palette}>
              Studio 3D
            </Button>
          </Link>
        </motion.div>

        {/* Quick Navigation Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="pt-6 border-t border-purple-100/60 max-w-xl mx-auto text-left"
        >
          <div className="flex items-center gap-2 text-xs font-extrabold text-pomify-navy uppercase tracking-wider mb-4 justify-center sm:justify-start">
            <Compass className="w-4 h-4 text-pomify-purple" />
            <span>Gợi ý khám phá cho bạn:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/robot"
              className="p-3.5 rounded-2xl bg-white/80 border border-purple-100 hover:border-pomify-purple shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <span className="font-bold text-xs text-pomify-navy group-hover:text-pomify-purple transition-colors">🤖 Chi tiết Robot</span>
              <span className="text-[11px] text-pomify-subtext mt-1">Cấu trúc phần cứng & OLED Display</span>
            </Link>

            <Link
              to="/features"
              className="p-3.5 rounded-2xl bg-white/80 border border-purple-100 hover:border-pomify-purple shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <span className="font-bold text-xs text-pomify-navy group-hover:text-pomify-purple transition-colors">⚡ Tính Năng Nổi Bật</span>
              <span className="text-[11px] text-pomify-subtext mt-1">Lịch thông minh, AI Assistant & Voice</span>
            </Link>

            <Link
              to="/about"
              className="p-3.5 rounded-2xl bg-white/80 border border-purple-100 hover:border-pomify-purple shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <span className="font-bold text-xs text-pomify-navy group-hover:text-pomify-purple transition-colors">✨ Về Pomify</span>
              <span className="text-[11px] text-pomify-subtext mt-1">Sứ mệnh công nghệ & cảm xúc</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </PageContainer>
  );
};

export default NotFoundPage;
