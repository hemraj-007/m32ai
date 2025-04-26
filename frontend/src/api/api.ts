// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:4000/api',
// });

// export default API;

import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default API;
