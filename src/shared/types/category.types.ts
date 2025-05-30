export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  count: number;
}

export interface CategoryResponse {
  data: Category[];
  message: string;
  status: number;
}

export interface CategoryCount {
  name: string;
  slug: string;
  icon: string;
  count: number;
}
