/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: "red", // Custom primary color (change as needed)
          secondary: "#9333EA",
          accent: "#F59E0B",
          dark: "#1E293B",
          light: "#F3F4F6",
        },
      },
    },
    plugins: [],
  };
  