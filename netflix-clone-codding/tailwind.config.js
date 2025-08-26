/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // 루트에 app/이 있으면 유지, 없으면 삭제
  ],
  theme: { extend: {} },
  plugins: [],
};
