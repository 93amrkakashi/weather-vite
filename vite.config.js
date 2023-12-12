// vite.config.js
import dotenv from 'dotenv';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default ({ mode }) => {
  const env = dotenv.config().parsed;

  return {

    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer,
        ],
      },
    },
    define: {
      'process.env': process.env,
    },
  };
};
