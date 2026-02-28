export interface ProductFetchList {
    idProduct: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    availability: boolean;
    productType: string;
    imageUrl?: string
}

export interface ProductFindByIdResponse{
    idProduct : number,
    name: string,
    description: string,
    quantity: number,
    price: number,
    availability: boolean,
    productType: string,
    isBurgerIngredient: boolean,
    productCategory: {
        id: number,
        name: string,
        description: string,
        available: boolean
    },
    supplierId: number
    imageUrl?: string
}

export interface ProductListResponse {
  items: ProductFetchList[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
