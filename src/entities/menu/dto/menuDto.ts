export interface MenuItemResponseDTO {
    idMenuItem?: number,
    itemType: "BURGER" | "PRODUCT",
    burger: Burger | null,
    product: Product | null,
    quantity: number,
}

export interface MenuItemRequestDTO {
    itemType: string,
    idBurger: number | null,
    idProduct: number | null,
    quantity: number,
}

export interface CreateMenuRequestDTO {
    name: string,
    description: string,
    isAvailable: boolean,
    idMenuCategory: number,
    items: MenuItemRequestDTO[]
}

export interface CreateMenuRequestWithImageDTO {
    menu: CreateMenuRequestDTO,
    file: File | null
}

export interface MenuResponseDTO {
    idMenu: number
    name: string
    description: string
    isAvailable: boolean
    imageUrl: string
    menuCategory: MenuCategory
    items: MenuItemResponseDTO[]
    createdAt: string;
    updatedAt: string;
    createdBy: number,
    updatedBy: number
}

export interface UpdateMenuRequestDTO {
    name: string,
    description: string,
    isAvailable: boolean,
    idMenuCategory: number,
    items: MenuItemRequestDTO[]
}

export interface UpdateMenuRequestWithImageDTO {
    menu: UpdateMenuRequestDTO,
    file: File | null
}

export interface MenuCategory {
    idMenuCategory: number,
    menuCategoryName: string,
    description: string
}

export interface Burger {
    idBurger: number,
    name: string,
    description?: string,
    finalPrice: number,
    imageUrl: string
    ingredients: IngredientsResponseDTO[]
}

export interface Product {
    idProduct: number,
    name: string,
    description?: string,
    price: number,
    imageUrl: string
}

export interface IngredientsResponseDTO {
    idProduct: number;
    productName: string;
    price: number,
    imageUrl: string,
    availability: boolean,
    quantity: number

}