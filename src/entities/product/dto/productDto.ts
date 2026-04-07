export interface CreateProductDto {
  name: string;
  description: string;
  quantity: number;
  price: number;
  availability: boolean;
  productType: string;
  productCategoryId: number;
  supplierId: number;
}

export interface CreateProductWihtImageDto {
  product: CreateProductDto,
  file?: File | null
}


export interface UpdateProductDto {
  
  name: string;
  description?: string;
  quantity: number;
  price: number;
  availability: boolean;
  productType: string;
  productCategoryId: number;
  supplierId: number;

}

export interface UpdateProductWithImageDto {
  product: UpdateProductDto,
  file?: File | null
}
