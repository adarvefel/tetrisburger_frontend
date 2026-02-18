export interface CreateProductDto {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  availability: boolean;
  productType?: string;
  ingredientType?: string;
  burgerIngredient: boolean;
  imageUrl?: string;
  productCategoryId: number;
  supplierId: number;
}

export interface CreateProductWihtImageDto {
  product: CreateProductDto,
  file?: File | null
}


export interface UpdateProductDto {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  availability: boolean;
  productType?: string;
  imageUrl?: string;
}
