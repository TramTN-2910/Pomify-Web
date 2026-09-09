import React from 'react';
import { motion } from 'framer-motion';
import { Brain, UserCheck, Heart, Sparkles, ShieldAlert, Award } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import Badge from '../../../components/ui/Badge';
import useRobotStore from '../../robot-companion/store/robotStore';

export const WhyPomifyTimeline = () => {
  const { setEmotion, setBubbleText } = useRobotStore();

  const values = [
    {
      id: 'smart',
      tag: '01. SMART TECH',
      title: 'Thông Minh Hơn Trợ Lý Thông Thường',
      description: 'Pomify hiểu ngữ cảnh lịch trình của bạn. Tự động điều chỉnh các nhắc nhở công việc thông minh dựa trên thói quen làm việc hàng ngày.',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      emotion: 'thinking',
      bubble: 'Smart AI routing your day... 🧠',
      highlights: ['Dự đoán công việc', 'Tự động sắp xếp ưu tiên', 'Tối ưu hóa thời gian tập trung'],
    },
    {
      id: 'personal',
      tag: '02. PERSONALIZED VIBE',
      title: 'Cá Nhân Hóa Đáng Yêu & Thích Nghi',
      description: 'Không bao giờ đơn điệu. Pomify thay đổi biểu cảm, màu sắc và tone giọng để phù hợp với cá tính và tâm trạng của riêng bạn.',
      icon: UserCheck,
      color: 'from-pink-500 to-rose-400',
      emotion: 'curious',
      bubble: 'Learning your favorite vibe! ✨',
      highlights: ['Tùy chỉnh màu 3D Studio', 'Biểu cảm LED sinh động', 'Thích ứng gu cá nhân'],
    },
    {
      id: 'caring',
      tag: '03. CARING COMPANION',
      title: 'Biết Khi Nào Cần Nhắc, Khi Nào Để Bạn Nghỉ Ngơi',
      description: 'Thấu hiểu giá trị của sự thư thái. Pomify chủ động nhận biết dấu hiệu mệt mỏi để khuyên bạn rời mắt khỏi màn hình đúng lúc.',
      icon: Heart,
      color: 'from-emerald-400 to-teal-500',
      emotion: 'caring',
      bubble: 'Take a break! You did great today 🫶',
      highlights: ['Cảnh báo kiệt sức (Burnout)', 'Nhắc uống nước & vươn vai', 'Bảo vệ sức khỏe lâu dài'],
    },
  ];

  return (
    <section id="why-pomify" className="py-24 relative overflow-hidden bg-gradient-to-b from-purple-50/20 via-white to-purple-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <Badge variant="purple" icon={Sparkles}>
            Why Choose Pomify?
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-pomify-navy tracking-tight">
            Smarter. Cutest. <span className="text-pomify-purple">Always by your side.</span>
          </h2>
          <p className="text-base sm:text-lg text-pomify-subtext leading-relaxed">
            3 lý do tạo nên sự khác biệt hoàn toàn giữa Pomify và các công cụ trợ lý cứng nhắc.
          </p>
        </div>

        {/* Sequential Value Timeline Cards */}
        <div className="space-y-16 max-w-5xl mx-auto">
          {values.map((item, idx) => {
            const Icon = item.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                onViewportEnter={() => {
                  setEmotion(item.emotion);
                  setBubbleText(item.bubble);
                }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
              >
                {/* Content Side */}
                <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <span className="text-xs font-extrabold tracking-widest text-pomify-purple uppercase">{item.tag}</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-pomify-navy leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-base text-pomify-subtext leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {item.highlights.map((point, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-white border border-purple-100 shadow-sm text-xs font-semibold text-pomify-navy flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pomify-purple" />
                        {point}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Card Side */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <GlassCard className="!p-8 bg-gradient-to-tr from-white to-purple-50/80 border-white/90 shadow-cute-float text-center space-y-6">
                    <div className={`w-16 h-16 rounded-3xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center mx-auto shadow-md`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-pomify-purple tracking-widest uppercase">Core Pillar</span>
                      <h4 className="text-xl font-extrabold text-pomify-navy mt-1">{item.id.toUpperCase()} EXPERIENCE</h4>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/80 border border-purple-100/60 text-xs font-mono text-pomify-navy">
                      Emotion Trigger: <span className="font-bold text-pomify-purple capitalize">{item.emotion}</span>
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyPomifyTimeline;
