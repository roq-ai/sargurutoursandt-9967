import axios from 'axios';
import queryString from 'query-string';
import { BookingManagerInterface, BookingManagerGetQueryInterface } from 'interfaces/booking-manager';
import { GetQueryInterface } from '../../interfaces';

export const getBookingManagers = async (query?: BookingManagerGetQueryInterface) => {
  const response = await axios.get(`/api/booking-managers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBookingManager = async (bookingManager: BookingManagerInterface) => {
  const response = await axios.post('/api/booking-managers', bookingManager);
  return response.data;
};

export const updateBookingManagerById = async (id: string, bookingManager: BookingManagerInterface) => {
  const response = await axios.put(`/api/booking-managers/${id}`, bookingManager);
  return response.data;
};

export const getBookingManagerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/booking-managers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBookingManagerById = async (id: string) => {
  const response = await axios.delete(`/api/booking-managers/${id}`);
  return response.data;
};
