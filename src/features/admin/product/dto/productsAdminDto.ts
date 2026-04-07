export interface ProductFetchList {
    idProduct: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    availability: boolean;
    productType: string;
    imageUrl: string
    createdAt: string;
    updatedAt: string;
    createdBy: number,
    updatedBy: number
}

export interface ProductFindByIdResponse{
    idProduct : number,
    name: string,
    description: string,
    quantity: number,
    price: number,
    availability: boolean,
    productType: string,
    productCategory: {
        id: number,
        name: string,
        description: string,
        available: boolean
    },
    supplier: {
        id: number,
        name: string,
        phone: string,
        email: string,
        address: string

    }
    imageUrl?: string
}

export interface ProductListResponse {
  items: ProductFetchList[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
