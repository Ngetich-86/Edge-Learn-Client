module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark","cupcake"],
  },
};



// module.exports = {
//   content: [
//     './src/**/*.{js,jsx,ts,tsx}', // Make sure to scan your React components for Tailwind classes
//   ],
//   theme: {
//     extend: {
//       fontFamily:{
//         grotesk: ['Space Grotesk']
//       }
//     },
//   },
//   plugins: [
//     require('daisyui'), 
//   ],
// };

