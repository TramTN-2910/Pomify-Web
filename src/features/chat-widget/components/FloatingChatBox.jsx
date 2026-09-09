import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageCircle, X, Send, Mic, Sparkles, Volume2 } from 'lucide-react';
import useVoiceRecognition from '../hooks/useVoiceRecognition';
import VoiceInputWaveform from './VoiceInputWaveform';
import useRobotStore from '../../robot-companion/store/robotStore';

export const FloatingChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { setEmotion, setBubbleText } = useRobotStore();
  const { isListening, transcript, startListening } = useVoiceRecognition();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi there! I am Pomify 🤖. How can I help organize your day today?',
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

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    const newMsg = { id: Date.now(), sender: 'user', text: userText, time: 'Just now' };
    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Trigger Robot reaction
    setEmotion('thinking');
    setBubbleText('Thinking reply... 🤔');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = 'That sounds like a great plan! I will add that to your Pomify smart calendar 📅.';
      if (userText.toLowerCase().includes('water') || userText.toLowerCase().includes('rest')) {
        replyText = 'Hydration reminder set! Stay healthy and take care 🫶.';
        setEmotion('caring');
      } else if (userText.toLowerCase().includes('hello') || userText.toLowerCase().includes('hi')) {
        replyText = 'Hello friend! Ready for a productive and peaceful day? ✨';
        setEmotion('happy');
      } else {
        setEmotion('happy');
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: 'bot', text: replyText, time: 'Just now' },
      ]);
      setIsTyping(false);
      setBubbleText(replyText);
    }, 1400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="w-[90vw] sm:w-[380px] h-[520px] bg-white/95 backdrop-blur-2xl rounded-4xl border border-purple-100 shadow-cute-float flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-pomify-purple to-pomify-blue text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">
                  <Bot className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                    Pomify Assistant <Sparkles className="w-3.5 h-3.5" />
                  </h3>
                  <span className="text-[11px] opacity-90 font-medium">Online • Cute AI Companion</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-purple-50/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3.5 rounded-3xl text-xs leading-relaxed font-medium ${
                      msg.sender === 'user'
                        ? 'bg-pomify-purple text-white rounded-br-none shadow-sm'
                        : 'bg-white text-pomify-navy border border-purple-100 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-purple-100 px-4 py-2.5 rounded-3xl text-xs text-pomify-subtext flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-pomify-purple animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-pomify-blue animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-2 h-2 rounded-full bg-pomify-pink animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Voice Waveform Indicator */}
            {isListening && (
              <div className="px-4 py-1">
                <VoiceInputWaveform active={isListening} />
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-purple-100 flex items-center gap-2">
              <button
                type="button"
                onClick={startListening}
                className={`p-2.5 rounded-2xl transition-colors ${
                  isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-purple-50 text-pomify-purple hover:bg-purple-100'
                }`}
                title="Voice Input"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder="Ask Pomify anything..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-pomify-purple"
              />

              <button
                type="submit"
                className="p-2.5 rounded-2xl bg-pomify-purple text-white hover:bg-pomify-purple-dark transition-colors shadow-sm"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-pomify-purple to-pomify-blue text-white flex items-center justify-center shadow-cute-float hover:shadow-glow-purple border-2 border-white cursor-pointer"
        aria-label="Toggle Pomify Chat"
      >
        <Bot className="w-7 h-7" />
      </motion.button>
    </div>
  );
};

export default FloatingChatBox;
