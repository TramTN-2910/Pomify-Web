import React, { useState } from 'react';
import { ChevronDown, Cpu, Eye, Volume2, Battery, Wifi } from 'lucide-react';

export const HardwareSpecs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const specCategories = [
    {
      icon: Cpu,
      title: 'Neural AI Core & Processor',
      details: [
        { label: 'Chipset', value: 'Pomify Neural Engine N1 (Quad-Core Cortex-A55)' },
        { label: 'RAM & Storage', value: '4GB LPDDR4X + 32GB High-Speed Flash' },
        { label: 'AI Inference', value: 'On-device Privacy Processing (Local Intent Engine)' },
      ],
    },
    {
      icon: Eye,
      title: 'Display & Face Matrix',
      details: [
        { label: 'Screen Tech', value: 'Custom Rounded OLED Face Matrix' },
        { label: 'Resolution', value: '320 x 240 pixels (60Hz Smooth Micro-Animations)' },
        { label: 'Glass Finish', value: 'Anti-Glare Curved Sapphire Crystal Coating' },
      ],
    },
    {
      icon: Volume2,
      title: 'Acoustics & Voice Capture',
      details: [
        { label: 'Microphones', value: '360° Quad Beamforming Microphone Array' },
        { label: 'Speaker System', value: '3W Neodymium Acoustic Driver with Bass Radiator' },
        { label: 'Noise Reduction', value: 'Smart AI Echo & Ambient Noise Cancellation' },
      ],
    },
    {
      icon: Battery,
      title: 'Battery & Power System',
      details: [
        { label: 'Battery Capacity', value: '4,200 mAh Li-ion Rechargeable Battery' },
        { label: 'Battery Life', value: 'Up to 18 Hours Active Companion Usage' },
        { label: 'Charging Method', value: 'Snap-to-Charge Magnetic Dock (15W Fast Charge)' },
      ],
    },
    {
      icon: Wifi,
      title: 'Connectivity & Sensors',
      details: [
        { label: 'Wireless Tech', value: 'Wi-Fi 6 (802.11ax) + Bluetooth 5.3 LE' },
        { label: 'Sensors', value: 'Capacitive Head Touch Sensor, Ambient Light, ToF Depth' },
        { label: 'Privacy Switch', value: 'Hardware Mic & Sensor Mute Toggle' },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-left space-y-1 mb-6">
        <h3 className="text-2xl font-extrabold text-pomify-navy">Technical Specifications</h3>
        <p className="text-sm text-pomify-subtext">Engineered for quiet efficiency, warmth, and high performance.</p>
      </div>

      <div className="space-y-3">
        {specCategories.map((cat, idx) => {
          const Icon = cat.icon;
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-purple-100 bg-white/80 backdrop-blur-md overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-purple-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-100 text-pomify-purple-dark">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm text-pomify-navy">{cat.title}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-pomify-subtext transition-transform duration-200 ${isOpen ? 'rotate-180 text-pomify-purple' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-purple-50 divide-y divide-purple-50 text-left">
                  {cat.details.map((item, dIdx) => (
                    <div key={dIdx} className="py-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                      <span className="font-medium text-pomify-subtext">{item.label}</span>
                      <span className="font-bold text-pomify-navy">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HardwareSpecs;
