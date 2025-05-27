// src/types/plant.types.ts
export interface Plant {
  id: string;
  name: string;
  image: string;
  description: string;
  benefits: string[];
  care: {
    watering: string;
    sunlight: string;
    temperature: string;
    soil: string;
  };
}

export interface HomeScreenProps {
  navigation: any;
}

export interface DetailScreenProps {
  navigation: any;
  route: {
    params: {
      plant: Plant;
    };
  };
}
