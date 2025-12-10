export interface ProductCategoryFetchList {
  id: number;
  name: string;
  description: string;
  available: boolean;
}

export interface ProductCategoryListResponse {
  items: ProductCategoryFetchList[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
