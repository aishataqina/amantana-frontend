import { Plant } from '../types/plant.types';

export interface PlantState {
  plants: Plant[];
  selectedPlant: Plant | null;
  favorites: string[]; // Menyimpan ID tanaman favorit
  isLoading: boolean;
  error: string | null;
}

export interface PlantActions {
  // Mutations
  setSelectedPlant: (plant: Plant | null) => void;
  toggleFavorite: (plantId: string) => void;
  clearSelectedPlant: () => void;

  // Derived selectors
  getPlantById: (id: string) => Plant | undefined;
  isFavorite: (id: string) => boolean;
  getAllFavorites: () => Plant[];
}

export type PlantStore = PlantState & PlantActions;
