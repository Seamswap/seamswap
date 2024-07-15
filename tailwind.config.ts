import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          900: '#00B8A1',
          400: '#DBFFFB',
          300: '#EBFFFD',
          200: '#B0C8C6',
          150: '#FAFFFE',
          100: '#F5FFFE',
          50: '#F0FFFD',
        },
        grey: {
          900: '#778B89',
          700: '#878787'
        },
      },
    },
    data: {
      true: 'true="true"',
    }
  },
  plugins: [],
};
export default config;
