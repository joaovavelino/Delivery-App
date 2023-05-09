import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(
    endpoint,
    { headers: { Authorization: JSON.parse(localStorage.getItem('user')).token } },
  );
  return data;
};

export const createOrder = async (endpoint, body) => {
  const { data } = await api.post(
    endpoint,
    body,
    { headers: { Authorization: JSON.parse(localStorage.getItem('user')).token } },
  );
  return data;
};

export const requestSellers = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestRegister = async (body) => {
  const { data } = await api.post('/user', body);

  return data;
};

export const admRequestRegister = async (body) => {
  const { data } = await api.post(
    '/admin/register',
    body,
    { headers: { Authorization: JSON.parse(localStorage.getItem('user')).token } },
  );

  return data;
};

export default api;
