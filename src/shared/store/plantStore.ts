import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlantStore } from './types';
import { PlantService } from '../services/plant.service';

export const usePlantStore = create<PlantStore>()(
  persist(
    (set, get) => ({
      // Initial state
      plants: [],
      selectedPlant: null,
      favorites: [],
      isLoading: false,
      error: null,

      // Mutations
      setSelectedPlant: (plant) => set({ selectedPlant: plant }),
      setIsLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
      setPlants: (plants) => set({ plants }),

      // API Actions
      fetchPlants: async () => {
        try {
          set({ isLoading: true, error: null });
          const plants = await PlantService.getAllPlants();
          set({ plants, isLoading: false });
        } catch (error) {
          set({ 
            error: 'Gagal mengambil data tanaman', 
            isLoading: false 
          });
        }
      },

      fetchPlantById: async (id: number) => {
        try {
          set({ isLoading: true, error: null });
          const plant = await PlantService.getPlantById(id);
          set({ selectedPlant: plant, isLoading: false });
          return plant;
        } catch (error) {
          set({ 
            error: 'Gagal mengambil detail tanaman', 
            isLoading: false 
          });
          throw error;
        }
      },

      searchPlants: async (query: string) => {
        try {
          set({ isLoading: true, error: null });
          const plants = await PlantService.searchPlants(query);
          return plants;
        } catch (error) {
          set({ 
            error: 'Gagal mencari tanaman', 
            isLoading: false 
          });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      fetchPlantsByCategory: async (category: string) => {
        try {
          set({ isLoading: true, error: null });
          const plants = await PlantService.getPlantsByCategory(category);
          set({ plants, isLoading: false });
          return plants;
        } catch (error) {
          set({ 
            error: 'Gagal mengambil tanaman berdasarkan kategori', 
            isLoading: false 
          });
          throw error;
        }
      },

      toggleFavorite: (plantId) => {
        const { favorites } = get();
        const isFavorited = favorites.includes(plantId);
        if (isFavorited) {
          set({ favorites: favorites.filter(id => id !== plantId) });
        } else {
          set({ favorites: [...favorites, plantId] });
        }
      },

      clearSelectedPlant: () => set({ selectedPlant: null }),

      // Derived selectors
      getPlantById: (id) => {
        return get().plants.find(plant => plant.id === id);
      },

      isFavorite: (id) => {
        return get().favorites.includes(id);
      },

      getAllFavorites: () => {
        const { plants, favorites } = get();
        return plants.filter(plant => favorites.includes(plant.id));
      },
    }),
    {
      name: 'amantana-plant-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    }
  )
);
