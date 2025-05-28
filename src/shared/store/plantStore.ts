import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlantStore } from './types';
import { plants as plantsData } from '../../data/plants';

export const usePlantStore = create<PlantStore>()(
  persist(
    (set, get) => ({
      // Initial state
      plants: plantsData,
      selectedPlant: null,
      favorites: [],
      isLoading: false,
      error: null,

      // Mutations
      setSelectedPlant: (plant) => set({ selectedPlant: plant }),
      
      toggleFavorite: (plantId) => {
        const { favorites } = get();
        const isFavorited = favorites.includes(plantId);
        if (isFavorited) {
          // Remove from favorites
          set({ favorites: favorites.filter(id => id !== plantId) });
        } else {
          // Add to favorites
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
      // Hanya menyimpan favorit di storage, bukan seluruh state
      partialize: (state) => ({ 
        favorites: state.favorites,
      }),
    }
  )
);
