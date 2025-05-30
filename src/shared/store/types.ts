import { Plant } from '../types/plant.types';

export interface PlantState {
  plants: Plant[];
  selectedPlant: Plant | null;
  favorites: number[]; // Menyimpan ID tanaman favorit
  isLoading: boolean;
  error: string | null;
}

export interface PlantActions {
  // Mutations
  setSelectedPlant: (plant: Plant | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPlants: (plants: Plant[]) => void;
  toggleFavorite: (plantId: number) => void;
  clearSelectedPlant: () => void;

  // API Actions
  fetchPlants: () => Promise<void>;
  fetchPlantById: (id: number) => Promise<Plant>;
  searchPlants: (query: string) => Promise<Plant[]>;
  fetchPlantsByCategory: (category: string) => Promise<Plant[]>;

  // Derived selectors
  getPlantById: (id: number) => Plant | undefined;
  isFavorite: (id: number) => boolean;
  getAllFavorites: () => Plant[];
}

export type PlantStore = PlantState & PlantActions;
