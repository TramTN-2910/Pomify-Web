/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        pomify: {
          purple: '#3B82F6',  // Mascot Blue Primary
          'purple-light': '#60A5FA',
          'purple-dark': '#1D4ED8',
          blue: '#3B82F6',    // Mascot Blue
          'blue-light': '#93C5FD',
          pink: '#FBCFE8',    // Pastel Pink
          'pink-light': '#FCE7F3',
          mint: '#A7F3D0',    // Mint
          'mint-light': '#D1FAE5',
          bg: '#F8FAFC',      // Off-white / Soft Blue tint
          card: '#FFFFFF',
          navy: '#0F172A',    // Slate Navy text
          subtext: '#64748B',  // Slate subtext
        }
      },
      borderRadius: {
        '4xl': '2rem',       // 32px - Cute soft border
        '3xl': '1.5rem',     // 24px
      },
      backdropBlur: {
        glass: '16px',
        'glass-lg': '24px',
      },
      boxShadow: {
        'soft-glass': '0 8px 32px 0 rgba(59, 130, 246, 0.15)',
        'cute-float': '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
        'glow-purple': '0 0 25px rgba(59, 130, 246, 0.35)',
        'glow-mint': '0 0 25px rgba(167, 243, 208, 0.35)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'wave': 'wave 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        wave: {
          '0%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1)' },
          '100%': { transform: 'scaleY(0.4)' },
        }
      }
    },
  },
  plugins: [],
}
