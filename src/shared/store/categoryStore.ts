import {create} from 'zustand';
import {usePlantStore} from './plantStore';
import {CategoryCount} from '../types/category.types';

interface CategoryState {
  categories: CategoryCount[];
}

interface CategoryActions {
  getCategories: () => CategoryCount[];
}

type CategoryStore = CategoryState & CategoryActions;

export const useCategoryStore = create<CategoryStore>()((set, _get) => ({
  // Initial state
  categories: [],

  // Actions
  getCategories: () => {
    const plants = usePlantStore.getState().plants;
    // Hitung jumlah tanaman per kategori
    const categoryCount = plants.reduce((acc: {[key: string]: number}, plant) => {
      const category = plant.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // Konversi ke format yang diinginkan
    const categories = Object.entries(categoryCount).map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      icon: getCategoryIcon(name),
      count,
    }));

    set({categories});
    return categories;
  },
}));

// Helper untuk menentukan icon berdasarkan nama kategori
function getCategoryIcon(category: string): string {
  switch (category.toLowerCase()) {
    case 'tanaman hias':
      return 'flower';
    case 'tanaman buah':
      return 'apple';
    case 'tanaman obat':
      return 'pill';
    case 'tanaman pangan':
      return 'wheat';
    default:
      return 'leafy';
  }
}
