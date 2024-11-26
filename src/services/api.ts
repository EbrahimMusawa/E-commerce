import axios from 'axios';
import { Product, User } from '../types';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/products');
  return data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const getCategories = async (): Promise<string[]> => {
  const { data } = await api.get('/products/categories');
  return data;
};

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const register = async (userData: Partial<User>) => {
  const { data } = await api.post('/users', userData);
  return data;
};

export default api;