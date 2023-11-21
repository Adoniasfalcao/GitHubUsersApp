import axios from 'axios';

//Acesso a API do GitHub
const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api;
