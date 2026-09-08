/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F8FA',
        surface: '#FFFFFF',
        'text-primary': '#17212F',
        'text-secondary': '#526071',
        accent: '#185ADB',
        'accent-soft': '#EDF3FF',
        success: '#166534',
        warning: '#854D0E',
        danger: '#B91C1C',
        border: '#D9DFE7',
      },
    },
  },
  plugins: [],
}
