import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import FloatingChatBox from './features/chat-widget/components/FloatingChatBox';
import ScrollToTop from './components/layout/ScrollToTop';
import { ThemeProvider } from './context/ThemeContext';

function MainAppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="relative min-h-screen bg-pomify-bg font-sans selection:bg-pomify-purple/30 selection:text-pomify-navy">
      <AppRouter />
      {!isAdminRoute && <FloatingChatBox />}
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MainAppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
