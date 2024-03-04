import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#FCDEBE",
      font_color: "black",
      button_bg: "white",
      hover_color: "#D4D2A5",
      dot_color: "#5E5768",
      dark_primary: "#3A445D",
      dark_font_color: "#D4D2A5",
      dark_button_bg: "gray",
      dark_hover_color: "#5E5768",
      dark_dot_color: "#fff",
      selected_dot_color: "green",
      menu: "black",
      menu_font_color: "#eee",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
