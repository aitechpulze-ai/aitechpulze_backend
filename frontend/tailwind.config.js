/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary:  '#2563eb',
        'primary-dark': '#1d4ed8',
        'primary-light': '#3b82f6',
        accent:   '#60a5fa',
        'accent-2': '#818cf8',
        'text-1': '#0f172a',
        'text-2': '#334155',
        'text-3': '#64748b',
        'text-4': '#94a3b8',
        'bg-1':   '#ffffff',
        'bg-2':   '#f8fafc',
        'bg-3':   '#f1f5f9',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        card:    '0 20px 60px rgba(0,0,0,0.08)',
        'card-lg':'0 40px 100px rgba(0,0,0,0.12)',
        blue:    '0 20px 60px rgba(37,99,235,0.18)',
        'blue-lg':'0 30px 80px rgba(37,99,235,0.25)',
        glow:    '0 0 40px rgba(37,99,235,0.25)',
        'glow-sm':'0 0 20px rgba(37,99,235,0.15)',
        sm:      '0 4px 20px rgba(0,0,0,0.06)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563eb, #818cf8)',
        'gradient-full':    'linear-gradient(135deg, #2563eb 0%, #818cf8 50%, #06b6d4 100%)',
        'gradient-mesh':    'radial-gradient(at 20% 30%, rgba(37,99,235,0.07) 0px, transparent 50%), radial-gradient(at 80% 10%, rgba(129,140,248,0.07) 0px, transparent 50%)',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'floatSlow 8s ease-in-out infinite',
        'spin-slow':    'spin-slow 20s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
        'marquee':      'marquee 30s linear infinite',
        'marquee-rev':  'marquee-reverse 30s linear infinite',
        'blob':         'blobMove 12s ease-in-out infinite',
        'node-glow':    'nodeGlow 2s ease-in-out infinite',
        'pulse-soft':   'pulse 3s ease-in-out infinite',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34,1.56,0.64,1)',
        smooth: 'cubic-bezier(0.16,1,0.3,1)',
      },
    },
  },
  plugins: [],
};
