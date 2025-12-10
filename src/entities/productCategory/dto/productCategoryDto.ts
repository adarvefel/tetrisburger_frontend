export interface ProductCategoryDto {
  id: number;
  name: string;
  description?: string;
  available: boolean;
}

export interface ListProductCategoryResponseDto {
  items: ProductCategoryDto[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface CreateProductCategoryDto {
  name: string;
  description?: string;
  available: boolean;
}

export interface UpdateProductCategoryDto {
  id: number;
  name: string;
  description?: string;
  available: boolean;
}
