export interface CreateMenuCategoryRequestDTO{
    menuCategoryName: string,
    description: string
}

export interface UpdateMenuCategoryRequestDTO{
    menuCategoryName: string,
    description: string
}

export interface MenuCategoryResponseDTO{
    idMenuCategory: number,
    menuCategoryName: string,
    description: string
}