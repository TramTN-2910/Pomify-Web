import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, Heart, Award, ShieldCheck, Target } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import Badge from '../../../components/ui/Badge';
import useRobotStore from '../../robot-companion/store/robotStore';

export const TeamGrid = () => {
  const { setEmotion, setBubbleText } = useRobotStore();
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      id: 'kim-ngoc',
      name: 'Kim Ngọc',
      role: 'Chief Executive Officer (CEO)',
      avatar: '👑',
      bgColor: 'bg-purple-100 text-purple-700',
      description: 'Định hướng tầm nhìn chiến lược, phát triển thương hiệu và tạo dựng hệ sinh thái Cute Tech.',
      bubble: 'Greetings from CEO Kim Ngọc! 👑',
    },
    {
      id: 'mai-anh',
      name: 'Mai Anh',
      role: 'Chief Marketing Officer (CMO)',
      avatar: '🌟',
      bgColor: 'bg-pink-100 text-pink-700',
      description: 'Lãnh đạo chiến lược marketing, định vị thương hiệu và xây dựng cộng đồng Pomify.',
      bubble: 'Mai Anh: Spreading the Cute Vibe! 🌟',
    },
    {
      id: 'gia-bao',
      name: 'Gia Bảo',
      role: 'Chief Financial Officer (CFO)',
      avatar: '💼',
      bgColor: 'bg-blue-100 text-blue-700',
      description: 'Quản lý tài chính, chiến lược nguồn lực và kế hoạch kinh doanh phát triển bền vững.',
      bubble: 'Gia Bảo: Fueling Pomify growth! 💼',
    },
    {
      id: 'ngoc-tram',
      name: 'Ngọc Trâm',
      role: 'Chief Technology Officer (CTO)',
      avatar: '💻',
      bgColor: 'bg-emerald-100 text-emerald-700',
      description: 'Lãnh đạo kỹ thuật 3D Studio, kiến trúc hệ thống và trải nghiệm E-commerce.',
      bubble: 'Ngọc Trâm: Crafting 3D Studio Tech! 💻',
    },
    {
      id: 'quoc-viet',
      name: 'Quốc Việt',
      role: 'Chief Product Officer (CPO)',
      avatar: '🚀',
      bgColor: 'bg-amber-100 text-amber-700',
      description: 'Quản trị sản phẩm phần cứng Robot, trải nghiệm người dùng và tính năng AI cốt lõi.',
      bubble: 'Quốc Việt: Engineering AI Companion! 🚀',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-purple-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="purple" icon={Users}>
            About Us & Brand Story
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-pomify-navy tracking-tight">
            The Team Behind <span className="text-pomify-purple">Pomify</span>
          </h2>
          <p className="text-base sm:text-lg text-pomify-subtext leading-relaxed">
            Chúng tôi xây dựng Pomify từ ước mơ mang công nghệ thông minh kết hợp với phong cách đáng yêu, mang đến niềm vui mỗi ngày cho bạn.
          </p>
        </div>

        {/* Brand Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <GlassCard className="!p-8 bg-gradient-to-tr from-white to-purple-50/60 border-purple-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-pomify-purple/20 text-pomify-purple flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-pomify-navy">Sứ Mệnh (Mission)</h3>
                <p className="text-xs text-pomify-purple font-semibold">Cute Tech for Everyday Life</p>
              </div>
            </div>
            <p className="text-sm text-pomify-subtext leading-relaxed">
              Biến những công cụ quản lý công việc khô khan thành người bạn robot đồng hành có cảm xúc, mang lại năng lượng tích cực và sự thư thái trọn vẹn.
            </p>
          </GlassCard>

          <GlassCard className="!p-8 bg-gradient-to-tr from-white to-blue-50/60 border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-pomify-blue/20 text-blue-600 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-pomify-navy">Tầm Nhìn (Vision)</h3>
                <p className="text-xs text-blue-600 font-semibold">Global AI Companion Leader</p>
              </div>
            </div>
            <p className="text-sm text-pomify-subtext leading-relaxed">
              Trở thành thương hiệu robot trợ lý cá nhân dẫn đầu phong cách Cute Vibe, hiện diện trên mọi bàn làm việc của người trẻ toàn cầu.
            </p>
          </GlassCard>
        </div>

        {/* 5-Member Team Roster Grid */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-extrabold text-pomify-navy">Executive Leadership Roster</h3>
          <p className="text-xs text-pomify-subtext mt-1">Hover over any team member card to introduce Pomify!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {teamMembers.map((member) => {
            const isHovered = hoveredMember === member.id;

            return (
              <GlassCard
                key={member.id}
                onMouseEnter={() => {
                  setHoveredMember(member.id);
                  setEmotion('happy');
                  setBubbleText(member.bubble);
                }}
                onMouseLeave={() => {
                  setHoveredMember(null);
                  setEmotion('happy');
                  setBubbleText("Hi, I'm Pomify 👋");
                }}
                className={`!p-6 text-center space-y-4 cursor-pointer transition-all duration-300 ${
                  isHovered ? '!bg-white border-pomify-purple shadow-glow-purple scale-105' : 'border-white/90'
                }`}
              >
                <div className={`w-20 h-20 rounded-full ${member.bgColor} flex items-center justify-center mx-auto text-4xl shadow-md transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
                  {member.avatar}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-pomify-navy">{member.name}</h4>
                  <p className="text-xs font-semibold text-pomify-purple">{member.role}</p>
                </div>
                <p className="text-xs text-pomify-subtext leading-relaxed">{member.description}</p>
                {isHovered && (
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-pomify-purple bg-purple-50 px-3 py-1 rounded-full animate-bounce">
                      🤖 Pomify Says Hi!
                    </span>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TeamGrid;
