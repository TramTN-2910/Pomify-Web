import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Send, Mic, Sparkles, Key, Check, Info, Bot } from 'lucide-react';
import logoImg from '../../../assets/logo.png';
import useVoiceRecognition from '../hooks/useVoiceRecognition';
import VoiceInputWaveform from './VoiceInputWaveform';
import useRobotStore from '../../robot-companion/store/robotStore';
import { sendMistralChatMessage } from '../services/mistralService';

export const FloatingChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userApiKey, setUserApiKey] = useState(() => localStorage.getItem('pomify_mistral_key') || '');
  const [tempApiKey, setTempApiKey] = useState('');

  const { setEmotion, setBubbleText } = useRobotStore();
  const { isListening, transcript, startListening } = useVoiceRecognition();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi there! I am Pomify Assistant powered by **Mistral AI** 🤖✨. How can I help you explore Pomify or manage your productivity today?',
      time: 'Just now',
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (transcript) {
      setInputMessage(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const saveApiKey = (e) => {
    e.preventDefault();
    setUserApiKey(tempApiKey.trim());
    localStorage.setItem('pomify_mistral_key', tempApiKey.trim());
    setShowSettings(false);
  };

  const handleSendMessage = async (textToSend = null) => {
    const queryText = (textToSend || inputMessage).trim();
    if (!queryText || isTyping) return;

    const userMsg = { id: Date.now(), sender: 'user', text: queryText, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Trigger 3D Robot emotion update
    setEmotion('thinking');
    setBubbleText('Thinking with Mistral AI... 🤔');
    setIsTyping(true);

    try {
      const historyForApi = [...messages, userMsg];
      const result = await sendMistralChatMessage({
        messages: historyForApi,
        userApiKey,
      });

      // Synchronize bot emotion based on query content
      const lower = queryText.toLowerCase();
      if (lower.includes('water') || lower.includes('rest') || lower.includes('health')) {
        setEmotion('caring');
      } else {
        setEmotion('happy');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: result.text,
          time: 'Just now',
          isFallback: result.isFallback,
        },
      ]);
      setBubbleText(result.text.replace(/\*\*/g, '').slice(0, 70) + '...');
    } catch (err) {
      console.error('Chat Assistant Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Oops! I encountered a transient glitch. Feel free to ask me again! 🤖',
          time: 'Just now',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Helper to render text with markdown bold and markdown links [Label](/path)
  const renderMessageContent = (content) => {
    // Replace markdown links [Text](/path) with clickable Link components
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      const label = match[1];
      const url = match[2];
      parts.push(
        url.startsWith('/') ? (
          <Link
            key={match.index}
            to={url}
            onClick={() => setIsOpen(false)}
            className="text-pomify-purple font-bold underline hover:text-pomify-purple-dark transition-colors"
          >
            {label}
          </Link>
        ) : (
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pomify-purple font-bold underline hover:text-pomify-purple-dark transition-colors"
          >
            {label}
          </a>
        )
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    // Process bold formatting **text**
    return parts.map((part, idx) => {
      if (typeof part !== 'string') return part;
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((sub, sIdx) => {
        if (sub.startsWith('**') && sub.endsWith('**')) {
          return <strong key={sIdx} className="font-extrabold">{sub.slice(2, -2)}</strong>;
        }
        return sub;
      });
    });
  };

  const quickSuggestions = [
    { label: '✨ What is Pomify?', query: 'What is Pomify?' },
    { label: '💰 Price & Specs', query: 'What are the hardware specs and price of Pomify?' },
    { label: '🎨 3D Customizer', query: 'Tell me about the 3D Customize Studio' },
    { label: '📦 How to Order?', query: 'How do I order Pomify and what payment options are supported?' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            className="w-[92vw] sm:w-[400px] h-[540px] bg-white/95 backdrop-blur-2xl rounded-4xl border border-purple-100 shadow-cute-float flex flex-col overflow-hidden mb-4 relative"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-pomify-purple via-purple-600 to-pomify-blue text-white flex items-center justify-between shadow-sm relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md p-1.5 flex items-center justify-center border border-white/40 shadow-inner">
                  <img src={logoImg} alt="Pomify Logo" className="w-full h-full object-contain drop-shadow" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm flex items-center gap-1.5 leading-tight">
                    Pomify Assistant <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] opacity-95 font-medium tracking-wide">
                      Powered by Mistral AI
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setTempApiKey(userApiKey);
                    setShowSettings(!showSettings);
                  }}
                  className={`p-2 rounded-xl transition-all ${
                    showSettings ? 'bg-white/30 text-white' : 'hover:bg-white/20 text-white/90'
                  }`}
                  title="Configure Mistral API Key"
                >
                  <Key className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/20 transition-colors text-white/90"
                  aria-label="Close Chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* API Key Settings Overlay */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-purple-50 border-b border-purple-100 text-xs text-pomify-navy relative z-20 shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-pomify-purple-dark flex items-center gap-1">
                      <Key className="w-3.5 h-3.5" /> Mistral API Key Settings
                    </span>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="text-pomify-subtext hover:text-pomify-navy"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] text-pomify-subtext mb-2 leading-relaxed">
                    Enter your custom Mistral AI key to use live cloud completions. If left empty, Pomify automatically operates on our smart knowledge engine!
                  </p>
                  <form onSubmit={saveApiKey} className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Paste API Key (or leave empty)"
                      value={tempApiKey}
                      onChange={(e) => setTempApiKey(e.target.value)}
                      className="flex-grow px-3 py-1.5 bg-white border border-purple-200 rounded-xl text-xs focus:outline-none focus:border-pomify-purple"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-pomify-purple text-white font-bold rounded-xl hover:bg-pomify-purple-dark transition-colors flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Save
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Body */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-purple-50/30 to-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-3xl text-xs leading-relaxed font-medium transition-all ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-pomify-purple to-purple-600 text-white rounded-br-none shadow-md'
                        : 'bg-white text-pomify-navy border border-purple-100/80 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {renderMessageContent(msg.text)}
                    {msg.isFallback && (
                      <div className="mt-1.5 pt-1.5 border-t border-purple-100 text-[10px] text-purple-400 flex items-center gap-1">
                        <Info className="w-3 h-3" /> Smart Pomify AI Knowledge Engine
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-purple-100 px-4 py-2.5 rounded-3xl text-xs text-pomify-subtext flex items-center gap-2 shadow-sm">
                    <Bot className="w-3.5 h-3.5 text-pomify-purple animate-spin" />
                    <span>Mistral AI is thinking...</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-pomify-purple animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-pomify-blue animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-pomify-pink animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 bg-purple-50/40 border-t border-purple-100/60 overflow-x-auto flex gap-1.5 no-scrollbar">
              {quickSuggestions.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip.query)}
                  disabled={isTyping}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-purple-200/80 hover:border-pomify-purple text-[11px] font-semibold text-pomify-purple-dark hover:bg-purple-50 transition-all shadow-2xs"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Voice Waveform Indicator */}
            {isListening && (
              <div className="px-4 py-1">
                <VoiceInputWaveform active={isListening} />
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-purple-100 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={startListening}
                className={`p-2.5 rounded-2xl transition-all ${
                  isListening ? 'bg-rose-100 text-rose-500 animate-pulse' : 'bg-purple-50 text-pomify-purple hover:bg-purple-100'
                }`}
                title="Voice Input"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder="Ask Pomify assistant..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isTyping}
                className="flex-grow px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-pomify-purple disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="p-2.5 rounded-2xl bg-gradient-to-r from-pomify-purple to-purple-600 text-white hover:opacity-90 disabled:opacity-40 transition-all shadow-sm cursor-pointer"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button with Pomify Logo */}
      <motion.button
        whileHover={{ scale: 1.08, rotate: isOpen ? 0 : 3 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-16 h-16 rounded-full bg-gradient-to-tr from-pomify-purple via-purple-400 to-pomify-blue p-0.5 shadow-cute-float hover:shadow-glow-purple border-2 border-white cursor-pointer transition-all flex items-center justify-center"
        aria-label="Toggle Pomify AI Chat"
      >
        {/* Animated Glow Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-pomify-purple/40 blur-md group-hover:bg-pomify-purple/60 transition-all animate-pulse" />

        {/* Button Inner Body */}
        <div className="relative w-full h-full rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center p-2.5 overflow-hidden">
          {isOpen ? (
            <X className="w-7 h-7 text-pomify-navy transition-transform duration-300 transform rotate-0 hover:rotate-90" />
          ) : (
            <img
              src={logoImg}
              alt="Pomify AI Assistant"
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            />
          )}

          {/* AI Badge Indicator */}
          {!isOpen && (
            <span className="absolute bottom-0.5 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-pomify-purple to-purple-600 text-white text-[9px] font-black flex items-center justify-center border-2 border-white shadow-sm z-10">
              AI
            </span>
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default FloatingChatBox;
