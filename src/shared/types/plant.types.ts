export interface Plant {
  id: string;
  name: string;
  image: string;
  category: 'Indoor' | 'Outdoor' | 'Herbal' | 'Tanaman Hias';
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  description: string;
  benefits: string[];
  care: {
    watering: string;
    sunlight: string;
    temperature: string;
    soil: string;
  };
}


