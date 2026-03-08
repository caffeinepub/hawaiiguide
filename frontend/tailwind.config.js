import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))'
        },
        chart: {
          1: 'oklch(var(--chart-1))',
          2: 'oklch(var(--chart-2))',
          3: 'oklch(var(--chart-3))',
          4: 'oklch(var(--chart-4))',
          5: 'oklch(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'oklch(var(--sidebar))',
          foreground: 'oklch(var(--sidebar-foreground))',
          primary: 'oklch(var(--sidebar-primary))',
          'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
          accent: 'oklch(var(--sidebar-accent))',
          'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
          border: 'oklch(var(--sidebar-border))',
          ring: 'oklch(var(--sidebar-ring))'
        },
        // Tropical palette
        ocean: {
          50:  'oklch(var(--ocean-50))',
          100: 'oklch(var(--ocean-100))',
          200: 'oklch(var(--ocean-200))',
          300: 'oklch(var(--ocean-300))',
          400: 'oklch(var(--ocean-400))',
          500: 'oklch(var(--ocean-500))',
          600: 'oklch(var(--ocean-600))',
          700: 'oklch(var(--ocean-700))',
          800: 'oklch(var(--ocean-800))',
          900: 'oklch(var(--ocean-900))',
          950: 'oklch(var(--ocean-950))',
        },
        coral: {
          300: 'oklch(var(--coral-300))',
          400: 'oklch(var(--coral-400))',
          500: 'oklch(var(--coral-500))',
          600: 'oklch(var(--coral-600))',
        },
        golden: {
          100: 'oklch(var(--golden-100))',
          200: 'oklch(var(--golden-200))',
          300: 'oklch(var(--golden-300))',
          400: 'oklch(var(--golden-400))',
          500: 'oklch(var(--golden-500))',
          600: 'oklch(var(--golden-600))',
        },
        palm: {
          100: 'oklch(var(--palm-100))',
          200: 'oklch(var(--palm-200))',
          300: 'oklch(var(--palm-300))',
          400: 'oklch(var(--palm-400))',
          500: 'oklch(var(--palm-500))',
          600: 'oklch(var(--palm-600))',
        },
        sand: {
          50:  'oklch(var(--sand-50))',
          100: 'oklch(var(--sand-100))',
          200: 'oklch(var(--sand-200))',
          300: 'oklch(var(--sand-300))',
          400: 'oklch(var(--sand-400))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
        card: '0 2px 12px 0 rgba(0,0,0,0.07)',
        'card-hover': '0 8px 30px 0 rgba(0,0,0,0.13)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [typography, containerQueries, animate]
};
