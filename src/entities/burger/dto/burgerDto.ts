export interface IngredientsResponseDTO {
  idProduct: number;
  name: string;
  price: number,
  imageUrl: string,
  availability: boolean,
  quantity: number
  
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

export interface BurgerIngredientsResponseDTO{
  idBurgerIngredient?: number,
  idProduct: number,
  productName: string,
  priceAtTime: number,
  quantity: number,
  subtotal?: number,
  isOptional: boolean,
  imageUrl: string
}

export interface BurgerResponseDTO{
  idBurger: number,
  name: string,
  description: string,
  basePrice: number,
  finalPrice: number,
  margin: number,
  marginPercentage: number,
  sellingAtLoss: boolean,
  isOnMenu: boolean,
  isFeatured: boolean,
  availability: boolean,
  imageUrl: string,
  timesOrdered: number,
  ingredients: BurgerIngredientsResponseDTO[]
}