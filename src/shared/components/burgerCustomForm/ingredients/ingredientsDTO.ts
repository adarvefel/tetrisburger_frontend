export interface IngredientsResponseDTO{
    idProduct: number,
    name: string,
    description: string,
    quantity: number,
    price: number,
    availability: boolean,
    productType: string
}



export interface IngredientsRequestDTO{
    idProduct: number,
    name: string,
    quantity: number,
    isOptional: boolean
}

export interface CreateBurgerRequestDTO{
    name: string,
    description: string,
    ingredients: IngredientsRequestDTO[]
}