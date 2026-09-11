import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquareQuote, ShieldCheck, ThumbsUp } from 'lucide-react';

export const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Minh Anh',
      role: 'Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'Robot Pomify thực sự đã làm thay đổi thói quen làm việc của mình! LED biểu cảm cực kỳ đáng yêu, nhắc nhở uống nước và nghỉ ngơi rất tinh tế.',
      verified: true,
      tag: 'Verified Purchaser',
    },
    {
      id: 2,
      name: 'Hoàng Nam',
      role: 'UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'Thiết kế đẹp mắt, góc bàn học nhìn high-tech hơn hẳn. Trợ lý Pomify phản hồi giọng nói mượt mà, tính năng Auto Planning hỗ trợ mình xếp lịch làm việc rất hợp lý.',
      verified: true,
      tag: 'Verified Purchaser',
    },
    {
      id: 3,
      name: 'Thu Trang',
      role: 'Content Creator',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'Màu sắc tươi tắn, âm thanh Lofi vô cùng chill khi cần tập trung. Bạn bè ghé phòng ai cũng khen chú robot này dễ thương hết nấc!',
      verified: true,
      tag: 'Verified Purchaser',
    },
    {
      id: 4,
      name: 'Quốc Bảo',
      role: 'Project Manager',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'Chất lượng gia công sắc nét, dock sạc từ tính thông minh. Tương tác mượt, cực kỳ hài lòng với trải nghiệm đặt mua tại Pomify Store.',
      verified: true,
      tag: 'Verified Purchaser',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pomify-purple/10 text-pomify-purple-dark text-xs font-bold">
          <MessageSquareQuote className="w-4 h-4 text-pomify-purple" />
          <span>Real Community Feedback</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-pomify-navy tracking-tight">
          Loved by Thousands of <span className="text-pomify-purple">Creators</span> & Tech Enthusiasts
        </h2>
        <p className="text-sm sm:text-base text-pomify-subtext leading-relaxed">
          See what our community has to say about bringing Pomify home to their daily desks.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((rev) => (
          <motion.div
            key={rev.id}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-purple-100 shadow-soft-glass flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Rating & Verified Tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>

              {/* Comment text */}
              <p className="text-xs text-pomify-navy/90 font-medium leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            {/* Author Profile */}
            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-3">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-pomify-purple/30 shadow-sm"
              />
              <div className="text-left">
                <h4 className="text-sm font-bold text-pomify-navy">{rev.name}</h4>
                <p className="text-[11px] text-pomify-subtext font-semibold">{rev.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Global Rating Stat */}
      <div className="mt-12 p-6 rounded-3xl bg-purple-50/60 border border-purple-100/80 max-w-xl mx-auto flex items-center justify-center gap-6 text-center">
        <div className="text-left">
          <span className="text-2xl font-black text-pomify-navy">4.9 / 5.0</span>
          <div className="flex items-center gap-1 text-amber-400 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
        </div>
        <div className="h-8 w-px bg-purple-200" />
        <div className="text-left">
          <span className="text-xs font-bold text-pomify-navy block">Over 1,200+ Delivered</span>
          <span className="text-[11px] text-pomify-subtext font-semibold">99.4% Positive Satisfaction Rate</span>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
