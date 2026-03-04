export interface IngredientsResponseDTO {
  idProduct: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  availability: boolean;
  productType: string;

  productCategory: {
    id: number;
    name: string;
    description: string;
    available: boolean;
  };

  supplier: {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
  };

  imageUrl: string;
}

export interface IngredientsRequestUI {
  imageUrl: string;
  name: string,

  idProduct: number,
  quantity: number,
  isOptional: boolean
}

export interface IngredientsRequestDTO {
  idProduct: number,
  quantity: number,
  isOptional: boolean
}


export interface CreateBurgerByAdminDTO {
  name: string,
  description: string,
  finalPrice: number,
  
  isFeatured: boolean,
  availability: boolean,
  ingredients: IngredientsRequestDTO[],
}


export interface CreateBurgerWithImageDTO{
  burger: CreateBurgerByAdminDTO,
  file?: File | null
}

export interface BurgerResponseDTO{
  
}