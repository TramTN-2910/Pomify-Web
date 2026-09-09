import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import { Scale, CheckCircle2, ShieldAlert } from 'lucide-react';

export const TermsOfServicePage = () => {
  return (
    <PageContainer>
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-left">
        
        {/* Header Title */}
        <div className="border-b border-purple-100 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-pomify-purple-dark text-xs font-bold">
            <Scale className="w-4 h-4 text-pomify-purple" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-pomify-navy tracking-tight">
            Pomify Terms of Service
          </h1>
          <p className="text-xs text-pomify-subtext">Effective Date: September 9, 2026</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-sm text-pomify-subtext leading-relaxed">
          <section className="p-6 rounded-3xl bg-white/80 border border-purple-100 shadow-soft-glass space-y-3">
            <h2 className="text-lg font-bold text-pomify-navy flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-pomify-purple" /> 1. Acceptance of Terms
            </h2>
            <p>
              By purchasing, connecting, or interacting with the Pomify Robot Companion or using our website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="p-6 rounded-3xl bg-white/80 border border-purple-100 shadow-soft-glass space-y-3">
            <h2 className="text-lg font-bold text-pomify-navy flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-pomify-purple" /> 2. Hardware Warranty & Returns
            </h2>
            <p>
              Every Pomify product comes with a 2-Year Limited Manufacturer Warranty covering defects in hardware, battery, OLED screen, and micro-motors.
            </p>
            <p>
              We offer a 30-Day Money-Back Guarantee from the date of delivery. Returned items must include all original packaging and accessories.
            </p>
          </section>

          <section className="p-6 rounded-3xl bg-white/80 border border-purple-100 shadow-soft-glass space-y-3">
            <h2 className="text-lg font-bold text-pomify-navy">3. Intellectual Property</h2>
            <p>
              All character designs, 3D models, facial animation matrices, sounds, software firmware, and branding materials associated with Pomify are protected by trademark and copyright laws.
            </p>
          </section>
        </div>

      </div>
    </PageContainer>
  );
};

export default TermsOfServicePage;
