import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const ProductFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Does Pomify require a monthly subscription?',
      a: 'No! All core companion features (emotion expressions, calendar sync, voice interaction, reminders, and offline routines) are 100% free forever with no hidden fees.',
    },
    {
      q: 'How does Pomify protect my privacy and audio?',
      a: 'Pomify handles voice intent locally using on-device AI processing. Your ambient conversations are never recorded or uploaded to cloud servers. A physical hardware mute switch is also provided on top.',
    },
    {
      q: 'Can I change Pomify colors or accessories later?',
      a: 'Yes! Accessories (hats, glasses, bowties) use magnetic micro-mounts that snap on and off cleanly. Additional accessory kits can be ordered anytime in our shop.',
    },
    {
      q: 'What languages does Pomify support?',
      a: 'Pomify currently supports English (US/UK/AU), Vietnamese, Japanese, and Korean, with more language packs arriving in free over-the-air firmware updates.',
    },
    {
      q: 'What is the return policy?',
      a: 'We offer a 30-day no-questions-asked money-back guarantee. If you and your Pomify do not bond within 30 days, return it for a full refund with free return shipping.',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-1">
        <h3 className="text-2xl font-extrabold text-pomify-navy">Frequently Asked Questions</h3>
        <p className="text-sm text-pomify-subtext">Have questions before welcoming Pomify home?</p>
      </div>

      <div className="space-y-3 text-left">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-purple-100 bg-white/80 backdrop-blur-md overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-purple-50/50 transition-colors"
              >
                <span className="font-bold text-sm sm:text-base text-pomify-navy pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-pomify-subtext flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-pomify-purple' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-purple-50 text-xs sm:text-sm text-pomify-subtext leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFAQ;
