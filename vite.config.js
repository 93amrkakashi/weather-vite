// vite.config.js
import dotenv from 'dotenv';


export default ({ mode }) => {
  const env = dotenv.config().parsed;

  return {

  
    define: {
      'process.env': process.env,
    },
  };
};
