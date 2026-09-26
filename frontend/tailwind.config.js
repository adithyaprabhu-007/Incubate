/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        dpi: {
          primary: '#0066cc',
          'primary-hover': '#0284c7',
          'surface-base': '#ffffff',
          'surface-hospital': '#f0f6ff',
          'surface-passive': '#f8fafc',
          'border-hairline': '#e2e8f0',
          'border-strong': '#cbd5e1',
          'text-primary': '#0f172a',
          'text-secondary': '#475569',
          'text-tertiary': '#64748b',
          'emergency-critical': '#dc2626',
          'emergency-bright': '#ef4444',
          'emergency-dark': '#991b1b',
          'emergency-container': '#fef2f2',
          'success': '#059669',
          'success-bright': '#10b981',
          'success-container': '#ecfdf5',
          'caution': '#d97706',
          'caution-container': '#fffbeb',
        },
        hospital: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#c5dfff',
          300: '#9bc9ff',
          400: '#69aaff',
          500: '#0066cc',
          600: '#0052a3',
          700: '#003d7a',
          800: '#002952',
          900: '#001429',
        },
        clinical: {
          blue: '#0066cc',
          card: '#f0f6ff',
          cardBorder: '#d0e2ff',
          success: '#059669',
          emergency: '#dc2626',
        }
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ecg-scan': 'ecgScan 2s linear infinite',
      },
      keyframes: {
        ecgScan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
