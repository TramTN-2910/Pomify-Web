import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import FloatingChatBox from './features/chat-widget/components/FloatingChatBox';
import ScrollToTop from './components/layout/ScrollToTop';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-pomify-bg font-sans selection:bg-pomify-purple/30 selection:text-pomify-navy">
        <AppRouter />
        <FloatingChatBox />
      </div>
    </BrowserRouter>
  );
}

export default App;
