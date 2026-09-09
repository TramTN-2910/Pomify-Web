import React from 'react';

export const VoiceInputWaveform = ({ active = false }) => {
  if (!active) return null;

  return (
    <div className="flex items-center justify-center gap-1 py-2 px-3 rounded-full bg-purple-50 border border-purple-100">
      <span className="w-1 bg-pomify-purple h-4 animate-wave" />
      <span className="w-1 bg-pomify-blue h-6 animate-wave" style={{ animationDelay: '0.15s' }} />
      <span className="w-1 bg-pomify-pink h-3 animate-wave" style={{ animationDelay: '0.3s' }} />
      <span className="w-1 bg-pomify-mint h-5 animate-wave" style={{ animationDelay: '0.1s' }} />
      <span className="w-1 bg-pomify-purple h-2 animate-wave" style={{ animationDelay: '0.2s' }} />
      <span className="text-[11px] font-bold text-pomify-purple ml-2">Listening...</span>
    </div>
  );
};

export default VoiceInputWaveform;
