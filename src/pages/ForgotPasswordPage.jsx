import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { Mail, KeyRound, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import useRobotStore from '../features/robot-companion/store/robotStore';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { setBubbleText, triggerReaction } = useRobotStore();

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendOTP = (e) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setStep(2);
      setBubbleText("OTP Code sent to your email! 📧 Check oroka150@gmail.com mailer", true);
      triggerReaction('happy');
    }, 1200);
  };

  const handleOTPChange = (val, idx) => {
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (val && idx < 5) {
      const nextInput = document.getElementById(`otp-pin-${idx + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp.join('').length < 6) {
      alert("Please enter full 6-digit OTP!");
      return;
    }
    setStep(3);
    setBubbleText("OTP verified! Create your new password 🔒", true);
    triggerReaction('happy');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setBubbleText("Password updated! Please Sign In 🎉", true);
    triggerReaction('happy');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <PageContainer>
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto flex flex-col justify-center min-h-[75vh]">
        <div className="p-8 rounded-4xl bg-white/80 backdrop-blur-xl border border-purple-100 shadow-soft-glass space-y-6 text-left">
          
          <div className="space-y-2 text-center">
            <div className="w-14 h-14 rounded-3xl bg-purple-100 text-pomify-purple flex items-center justify-center text-2xl mx-auto shadow-sm">
              <KeyRound className="w-7 h-7" />
            </div>
            <h1 className="text-3xl font-black text-pomify-navy tracking-tight">
              {step === 1 && 'Forgot Password'}
              {step === 2 && 'Enter 6-Digit OTP'}
              {step === 3 && 'Reset Password'}
            </h1>
            <p className="text-xs text-pomify-subtext max-w-xs mx-auto">
              {step === 1 && 'Enter your registered email address to receive an instant verification OTP code via oroka150@gmail.com mailer.'}
              {step === 2 && `An OTP verification code was sent to ${email}. Please enter it below.`}
              {step === 3 && 'Enter your new account password.'}
            </p>
          </div>

          {/* STEP 1: ENTER EMAIL */}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-pomify-navy mb-1.5">Registered Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-pomify-purple absolute left-4 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@pomify.ai"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-pomify-navy font-bold focus:outline-none focus:border-pomify-purple"
                  />
                </div>
              </div>

              <Button variant="primary" size="lg" type="submit" disabled={isSending} className="w-full shadow-cute-float" icon={ArrowRight}>
                {isSending ? 'Sending OTP Code...' : 'Send OTP Verification Code'}
              </Button>
            </form>
          )}

          {/* STEP 2: ENTER 6-DIGIT OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-6 text-xs">
              <div className="flex items-center justify-center gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-pin-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(e.target.value, idx)}
                    className="w-11 h-12 rounded-2xl bg-purple-50/80 border-2 border-purple-200 text-center text-xl font-black text-pomify-navy focus:outline-none focus:border-pomify-purple focus:ring-2 focus:ring-pomify-purple/30"
                  />
                ))}
              </div>

              <Button variant="primary" size="lg" type="submit" className="w-full shadow-cute-float" icon={Check}>
                Verify OTP Code
              </Button>
            </form>
          )}

          {/* STEP 3: RESET PASSWORD */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-pomify-navy mb-1.5">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-pomify-navy font-bold focus:outline-none focus:border-pomify-purple"
                />
              </div>

              <Button variant="primary" size="lg" type="submit" className="w-full shadow-cute-float" icon={Check}>
                Update Password
              </Button>
            </form>
          )}

          <div className="pt-2 text-center text-xs">
            <Link to="/login" className="font-bold text-pomify-purple hover:underline">
              ← Return to Sign In
            </Link>
          </div>

        </div>
      </div>
    </PageContainer>
  );
};

export default ForgotPasswordPage;
