/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pomify: {
          purple: '#A78BFA',  // Pastel Purple
          'purple-light': '#C4B5FD',
          'purple-dark': '#7C3AED',
          blue: '#93C5FD',    // Baby Blue
          'blue-light': '#BFDBFE',
          pink: '#FBCFE8',    // Pastel Pink
          'pink-light': '#FCE7F3',
          mint: '#A7F3D0',    // Mint
          'mint-light': '#D1FAE5',
          bg: '#F9F9FB',      // Off-white / Cream
          card: '#FFFFFF',
          navy: '#1E1B4B',    // Navy text
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
        'soft-glass': '0 8px 32px 0 rgba(167, 139, 250, 0.12)',
        'cute-float': '0 20px 40px -15px rgba(30, 27, 75, 0.08)',
        'glow-purple': '0 0 25px rgba(167, 139, 250, 0.35)',
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
