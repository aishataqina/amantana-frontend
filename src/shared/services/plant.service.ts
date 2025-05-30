import api from './api.config';
import { Plant } from '../types/plant.types';

export const PlantService = {
  // Mendapatkan semua tanaman
  getAllPlants: async (): Promise<Plant[]> => {
    try {
      console.log('Fetching all plants...');
      const response = await api.get('/plants');
      console.log('Plants API Response:', response);
      
      const plants = response.data;
      
      // Pastikan response.data adalah array
      if (!Array.isArray(plants)) {
        console.error('Invalid response format:', plants);
        throw new Error('Format data tidak valid');
      }
      
      return plants;
    } catch (error: any) {
      console.error('Error fetching plants:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        stack: error.stack,
      });
      throw new Error(
        error.response?.data?.message || 
        'Gagal mengambil data tanaman. Silakan coba lagi.'
      );
    }
  },

  // Mendapatkan detail tanaman berdasarkan ID
  getPlantById: async (id: number): Promise<Plant> => {
    try {
      console.log(`Fetching plant with ID: ${id}`);
      const response = await api.get(`/plants/${id}`);
      console.log('Plant detail fetched successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching plant ${id}:`, {
        message: error.message,
        code: error.code,
        response: error.response?.data,
      });
      throw new Error(
        error.response?.data?.message || 
        'Gagal mengambil detail tanaman. Silakan coba lagi.'
      );
    }
  },

  // Mencari tanaman berdasarkan query
  searchPlants: async (query: string): Promise<Plant[]> => {
    try {
      console.log(`Searching plants with query: ${query}`);
      const response = await api.get('/plants', {
        params: { search: query }
      });
      console.log('Search results:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error searching plants:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
      });
      throw new Error(
        error.response?.data?.message || 
        'Gagal mencari tanaman. Silakan coba lagi.'
      );
    }
  },

  // Mendapatkan tanaman berdasarkan kategori
  getPlantsByCategory: async (category: string): Promise<Plant[]> => {
    try {
      console.log(`Fetching plants by category: ${category}`);
      const response = await api.get('/plants', {
        params: { category }
      });
      console.log('Category results:', response.data);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching plants by category ${category}:`, {
        message: error.message,
        code: error.code,
        response: error.response?.data,
      });
      throw new Error(
        error.response?.data?.message || 
        'Gagal mengambil tanaman berdasarkan kategori. Silakan coba lagi.'
      );
    }
  },
};
