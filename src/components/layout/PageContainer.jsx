import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export const PageContainer = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col bg-pomify-bg selection:bg-pomify-purple/30">
      <Navbar />
      <main className={`flex-grow pt-20 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageContainer;
