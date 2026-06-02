/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#0D1117',
        card: '#1E2235',
        green: { DEFAULT: '#00B956', dk: '#052E16', lt: '#4ADE80' },
        blue: '#185FA5',
        purple: '#534AB7',
        teal: '#0F6E56',
        amber: '#EF9F27',
        red: '#E24B4A',
        gray: { DEFAULT: '#9CA3AF', border: '#374151' },
      },
    },
  },
  plugins: [],
}
