import axios from 'axios';
import queryString from 'query-string';
import { VanCarInterface, VanCarGetQueryInterface } from 'interfaces/van-car';
import { GetQueryInterface } from '../../interfaces';

export const getVanCars = async (query?: VanCarGetQueryInterface) => {
  const response = await axios.get(`/api/van-cars${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createVanCar = async (vanCar: VanCarInterface) => {
  const response = await axios.post('/api/van-cars', vanCar);
  return response.data;
};

export const updateVanCarById = async (id: string, vanCar: VanCarInterface) => {
  const response = await axios.put(`/api/van-cars/${id}`, vanCar);
  return response.data;
};

export const getVanCarById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/van-cars/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVanCarById = async (id: string) => {
  const response = await axios.delete(`/api/van-cars/${id}`);
  return response.data;
};
