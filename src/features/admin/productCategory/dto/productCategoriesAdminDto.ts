export interface ProductCategoryFetchList {
  id: number;
  name: string;
  description: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: number,
  updatedBy: number
}

export interface ProductCategoryListResponse {
  items: ProductCategoryFetchList[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
