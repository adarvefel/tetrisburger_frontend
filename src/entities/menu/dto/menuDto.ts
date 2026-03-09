export interface MenuItemResponseDTO{
    idMenuItem?: number,
    itemType: string,
    idBurger: number | null,
    idProduct: number,
    quantity: number,
    imageUrl: string,
    productName: string
}

export interface MenuItemRequestDTO{
    itemType: string,
    idBurger: number | null,
    idProduct: number,
    quantity: number,
}

export interface CreateMenuRequestDTO{
    name: string,
    description: string,
    regularPrice: number,
    comboPrice: number,
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
    regularPrice: number
    comboPrice: number
    isAvailable: boolean
    imageUrl: string
    idMenuCategory: number
    items: MenuItemResponseDTO[]
}