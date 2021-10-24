import axios from 'axios';

const token = localStorage.getItem('@nlwHeat:token');

const api = axios.create({
  baseURL: 'http://localhost:4000'
});

api.defaults.headers.common.authorization = `Bearer ${token}`;

export { api };