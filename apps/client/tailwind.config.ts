import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        foreground: 'var(--background)',
        backround: 'var(--foreground)'
      },
      gridTemplateRows: {
        calendar: '60px repeat(4, minmax(0, 1fr))'
      }
    }
  },
  plugins: []
};
export default config;
