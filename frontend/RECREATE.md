# Steps to make this project again

## Installations

```shell
npx create-react-app tuesday --template typescript
cd tuesday
npm i -D tailwindcss
npx tailwindcss init
npm i recoil react-router-dom react-use @heroicons/react @headlessui/react framer-motion
```

## Configurations

Add the correct paths of content in your `tailwind.config.js` file

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Add the taiwind directives in your `index.css` file

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
