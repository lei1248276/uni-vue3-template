/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin'

export default {
  content: ['./index.html', './src/**/*.{vue,nvue,js,ts}'],
  corePlugins: {
    preflight: false,
    backdropOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    ringOpacity: false,
    textOpacity: false
  },
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        // * inset style polyfill
        {
          'inset': (value) => ({
            top: value,
            right: value,
            bottom: value,
            left: value
          }),
          'inset-x': (value) => ({
            left: value,
            right: value
          }),
          'inset-y': (value) => ({
            top: value,
            bottom: value
          })
        },
        {
          values: theme('spacing'),
          type: 'length' // 可以根据需要调整类型
        }
      )
    })
  ]
}
