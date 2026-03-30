/* eslint-env node */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
});
