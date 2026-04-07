export interface AdditionSettingsResponseDTO {
    maxAdditionsPerItem: number,
    maxTotalPrice: number,
    additionsEnabled: boolean
}

export interface UpdateAdditionSettingsRequestDTO {
  maxAdditionsPerItem: number;
  maxTotalPrice: number;
  additionsEnabled: boolean;
}

export interface BurgerSettingsResponseDTO{
    customBurgerMinPrice: number;
    customBurgerMaxPrice: number;
    minIngredients: number;
    maxIngredients: number;
    customBurgersEnabled: boolean;
    minPriceFormatted: string;
    maxPriceFormatted: string;
}

export interface UpdateBurgerSettingsRequestDTO {
  customBurgerMinPrice: number;
  customBurgerMaxPrice: number;
  minIngredients: number;
  maxIngredients: number;
  customBurgersEnabled: boolean;
}