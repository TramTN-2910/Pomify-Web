import React from 'react';

export const RobotExpressions = ({ emotion = 'happy' }) => {
  // SVG face overlay for the 3D head screen
  const getEyeExpression = () => {
    switch (emotion) {
      case 'curious':
        return (
          <g fill="#A78BFA">
            {/* Left eye slightly larger, right eye tilted */}
            <ellipse cx="35" cy="50" rx="9" ry="12" />
            <ellipse cx="65" cy="48" rx="7" ry="9" transform="rotate(10 65 48)" />
            <circle cx="37" cy="46" r="3" fill="#FFFFFF" />
            <circle cx="66" cy="45" r="2" fill="#FFFFFF" />
          </g>
        );
      case 'thinking':
        return (
          <g fill="#93C5FD">
            <ellipse cx="35" cy="50" rx="8" ry="4" transform="rotate(-15 35 50)" />
            <ellipse cx="65" cy="50" rx="8" ry="4" transform="rotate(15 65 50)" />
            <circle cx="75" cy="35" r="3" fill="#A78BFA" className="animate-ping" />
          </g>
        );
      case 'caring':
        return (
          <g fill="#FBCFE8">
            {/* Heart eyes */}
            <path d="M 35 46 C 35 42 29 42 29 46 C 29 51 35 55 35 55 C 35 55 41 51 41 46 C 41 42 35 42 35 46 Z" fill="#F472B6" />
            <path d="M 65 46 C 65 42 59 42 59 46 C 59 51 65 55 65 55 C 65 55 71 51 71 46 C 71 42 65 42 65 46 Z" fill="#F472B6" />
          </g>
        );
      case 'alert':
        return (
          <g fill="#A7F3D0">
            <circle cx="35" cy="50" r="10" stroke="#34D399" strokeWidth="2.5" fill="#ECFDF5" />
            <circle cx="65" cy="50" r="10" stroke="#34D399" strokeWidth="2.5" fill="#ECFDF5" />
            <circle cx="35" cy="50" r="4" fill="#059669" />
            <circle cx="65" cy="50" r="4" fill="#059669" />
          </g>
        );
      case 'sleepy':
        return (
          <g fill="#93C5FD" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round">
            <path d="M 28 52 Q 35 58 42 52" fill="none" />
            <path d="M 58 52 Q 65 58 72 52" fill="none" />
          </g>
        );
      case 'happy':
      default:
        return (
          <g fill="#A78BFA">
            <ellipse cx="35" cy="50" rx="8" ry="11" />
            <ellipse cx="65" cy="50" rx="8" ry="11" />
            <circle cx="37" cy="46" r="3" fill="#FFFFFF" />
            <circle cx="67" cy="46" r="3" fill="#FFFFFF" />
            {/* Cute smile arc */}
            <path d="M 44 60 Q 50 65 56 60" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        );
    }
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Screen background glow */}
      <rect x="15" y="25" width="70" height="50" rx="15" fill="#1E1B4B" opacity="0.9" />
      {getEyeExpression()}
    </svg>
  );
};

export default RobotExpressions;
