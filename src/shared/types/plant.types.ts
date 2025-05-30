export interface Plant {
  id: number;
  name: string;
  image: string;
  category: string;
  difficulty: string;
  description: string;
  benefits: string[];
  care: {
    watering: string;
    sunlight: string;
    temperature: string;
    soil: string;
  };
  created_at: string;
  updated_at: string;
}


