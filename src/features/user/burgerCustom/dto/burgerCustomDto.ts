import { BurgerIngredientsResponseDTO, BurgerResponseDTO } from "../../../../entities/burger/dto/burgerDto"

export interface IngredientRequestDTO {
  idProduct: number
  quantity: number
}

export interface CreateCustomBurgerRequestDTO {
  name: string
  ingredients: IngredientRequestDTO[]
}

export interface BurgerFavoriteResponseDTO{
  idBurger: number,
  name: string,
  finalPrice: number,
  burgerIngredients: BurgerIngredientsResponseDTO
}

export interface FavoriteBurgerResponseDTO{
  idFavorite: number
  burger: BurgerFavoriteResponseDTO
}

export interface UpdateCustomBurgerRequestDTO{
  name: string
  ingredients: IngredientRequestDTO[]
}