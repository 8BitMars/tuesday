/** @type {import('tailwindcss').Config} */
const primary = {
  100: "#cce3fb",
  200: "#99c7f7",
  300: "#66abf2",
  400: "#338fee",
  500: "#0073ea",
  600: "#005cbb",
  700: "#00458c",
  800: "#002e5e",
  900: "#00172f",
};

const primaryhover = {
  100: "#ccdff1",
  200: "#99bfe3",
  300: "#66a0d5",
  400: "#3380c7",
  500: "#0060b9",
  600: "#004d94",
  700: "#003a6f",
  800: "#00264a",
  900: "#001325",
};

const positive = {
  100: "#d3e7dc",
  200: "#a8cfb9",
  300: "#7cb796",
  400: "#519f73",
  500: "#258750",
  600: "#1e6c40",
  700: "#165130",
  800: "#0f3620",
  900: "#071b10",
};

const logogreen = {
  100: "#d8f0e5",
  200: "#b1e1ca",
  300: "#8bd2b0",
  400: "#64c395",
  500: "#3db47b",
  600: "#319062",
  700: "#256c4a",
  800: "#184831",
  900: "#0c2419",
};

const warning = {
  100: "#fdf8d4",
  200: "#fbf1a9",
  300: "#f9eb7f",
  400: "#f7e454",
  500: "#f5dd29",
  600: "#c4b121",
  700: "#938519",
  800: "#625810",
  900: "#312c08",
};

const negative = {
  100: "#f7d8dc",
  200: "#efb0ba",
  300: "#e88997",
  400: "#e06175",
  500: "#d83a52",
  600: "#ad2e42",
  700: "#822331",
  800: "#561721",
  900: "#2b0c10",
};

const secret = {
  100: "#fddfe5",
  200: "#fbbfcb",
  300: "#fa9fb0",
  400: "#f87f96",
  500: "#f65f7c",
  600: "#c54c63",
  700: "#94394a",
  800: "#622632",
  900: "#311319",
};

const sharable = {
  100: "#ecdff8",
  200: "#dabef1",
  300: "#c79eea",
  400: "#b57de3",
  500: "#a25ddc",
  600: "#824ab0",
  700: "#613884",
  800: "#412558",
  900: "#20132c",
};

const icon = {
  100: "#e1e1e4",
  200: "#c2c3c9",
  300: "#a4a4af",
  400: "#858694",
  500: "#676879",
  600: "#525361",
  700: "#3e3e49",
  800: "#292a30",
  900: "#151518",
};

const text = {
  100: "#d6d6d7",
  200: "#adadaf",
  300: "#848588",
  400: "#5b5c60",
  500: "#323338",
  600: "#28292d",
  700: "#1e1f22",
  800: "#141416",
  900: "#0a0a0b",
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "bg",
    {
      pattern:
        /bg-(primary|positive|warning|negative|sharable|secret|)-(100|200|300|400|500)/,
      variants: ["lg", "hover", "focus", "lg:hover"],
    },
  ],
  theme: {
    extend: {
      colors: {
        primary,
        primaryhover,
        negative,
        warning,
        positive,
        logogreen,
        sharable,
        secret,
        icon,
        text,
      },
    },
  },
  plugins: [],
};
