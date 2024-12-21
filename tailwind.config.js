import withMT from "@material-tailwind/react/utils/withMT";
import { nextui } from "@nextui-org/react";
import flowbitePlugin from "flowbite/plugin";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "**/*.JSX",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [flowbitePlugin, nextui()],
});
