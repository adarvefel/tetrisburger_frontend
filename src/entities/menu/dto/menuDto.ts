export interface MenuItemResponseDTO{
    idMenuItem?: number,
    itemType: "BURGER" | "PRODUCT",
    idBurger: number | null,
    idProduct: number | null,
    quantity: number,
}

export interface MenuItemRequestDTO{
    itemType: string,
    idBurger: number | null,
    idProduct: number | null,
    quantity: number,
}

export interface CreateMenuRequestDTO{
    name: string,
    description: string,
    isAvailable: boolean,
    idMenuCategory: number,
    items: MenuItemRequestDTO[]
}

export interface CreateMenuRequestWithImageDTO{
    menu: CreateMenuRequestDTO,
    file: File | null
}

export interface MenuResponseDTO {
    idMenu: number
    name: string
    description: string
    isAvailable: boolean
    imageUrl: string
    idMenuCategory: number
    items: MenuItemResponseDTO[]
}