import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export const PageContainer = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col bg-pomify-bg selection:bg-blue-500/20 relative overflow-x-hidden">
      {/* Ambient Background Glow Blobs */}
      <div className="fixed top-1/4 left-1/6 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="fixed bottom-1/4 right-1/6 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-subtle" style={{ animationDelay: '2s' }} />

      <Navbar />
      <main className={`flex-grow pt-20 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageContainer;
