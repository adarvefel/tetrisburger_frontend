export interface ProductFetchList {
    idProduct: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    availability: boolean;
    productType: string;
}

export interface ProductFindByIdResponse{
    idProduct : number,
    name: string,
    description: string,
    quantity: number,
    price: number,
    available: boolean,
    productType: string,
    ingredientsType: string,
    burguerIngredients: string,
}

export interface ProductListResponse {
  items: ProductFetchList[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
