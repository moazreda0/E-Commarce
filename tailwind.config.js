/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [  
    flowbite.content(),

      "./index.html",

    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {},
  },
  plugins: [    flowbite.plugin(),
  ],
}



