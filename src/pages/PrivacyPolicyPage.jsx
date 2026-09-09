import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  return (
    <PageContainer>
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-left">
        
        {/* Header Title */}
        <div className="border-b border-purple-100 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-pomify-purple-dark text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-pomify-purple" />
            <span>Privacy & Security Commitments</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-pomify-navy tracking-tight">
            Pomify Privacy Policy
          </h1>
          <p className="text-xs text-pomify-subtext">Last Updated: September 9, 2026</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-sm text-pomify-subtext leading-relaxed">
          <section className="p-6 rounded-3xl bg-white/80 border border-purple-100 shadow-soft-glass space-y-3">
            <h2 className="text-lg font-bold text-pomify-navy flex items-center gap-2">
              <Lock className="w-5 h-5 text-pomify-purple" /> 1. On-Device Local AI Privacy First
            </h2>
            <p>
              At Pomify, we believe your home conversations and personal routines belong exclusively to you. All ambient voice processing, intent detection, and emotion analysis are executed locally on the Pomify Neural Engine N1 embedded within your physical robot.
            </p>
            <p>
              Audio recordings are never saved, never uploaded to cloud servers, and never sold to third-party advertisers.
            </p>
          </section>

          <section className="p-6 rounded-3xl bg-white/80 border border-purple-100 shadow-soft-glass space-y-3">
            <h2 className="text-lg font-bold text-pomify-navy flex items-center gap-2">
              <Eye className="w-5 h-5 text-pomify-purple" /> 2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, and encrypted credentials when creating a Pomify Account.</li>
              <li><strong>Order & Delivery Data:</strong> Shipping address, phone number, and transaction records required for order fulfillment.</li>
              <li><strong>Anonymous Telemetry:</strong> Opt-in diagnostic crash reports to help improve firmware stability.</li>
            </ul>
          </section>

          <section className="p-6 rounded-3xl bg-white/80 border border-purple-100 shadow-soft-glass space-y-3">
            <h2 className="text-lg font-bold text-pomify-navy flex items-center gap-2">
              <FileText className="w-5 h-5 text-pomify-purple" /> 3. Hardware Mute Guarantee
            </h2>
            <p>
              Every Pomify unit includes a physical hardware mute switch located on top of the robot shell. Toggling off this switch physically disconnects the power circuit to the quad microphone array and camera sensors.
            </p>
          </section>

          <section className="p-6 rounded-3xl bg-white/80 border border-purple-100 shadow-soft-glass space-y-3">
            <h2 className="text-lg font-bold text-pomify-navy">4. Contact Our Data Protection Officer</h2>
            <p>
              If you have any questions or wish to exercise your data deletion rights, please contact privacy@pomify.ai or our support team at <strong>oroka150@gmail.com</strong>.
            </p>
          </section>
        </div>

      </div>
    </PageContainer>
  );
};

export default PrivacyPolicyPage;
