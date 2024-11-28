export interface Category {
    id: number;
    name: string;
    parent_id?: number;
    parent?: Category;
    subcategories?: Category[];
  }
  