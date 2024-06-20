import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:8080/', // Remplacez par votre URL d'API
  timeout: 10000, // Timeout en millisecondes (facultatif)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;