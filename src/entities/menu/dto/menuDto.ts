    export interface MenuItemResponseDTO{
        idMenuItem?: number,
        itemType: "BURGER" | "PRODUCT",
        burger: Burger | null,
        product: Product | null,
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
        menuCategory: MenuCategory
        items: MenuItemResponseDTO[]
    }

    export interface UpdateMenuRequestDTO{
        name: string,
        description: string,
        isAvailable: boolean,
        idMenuCategory: number,
        items: MenuItemRequestDTO[]
    }

    export interface UpdateMenuRequestWithImageDTO{
        menu: UpdateMenuRequestDTO,
        file: File | null
    }

    export interface MenuCategory{
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
    }

    export interface Product {
        idProduct: number,
        name: string,
        description?: string,
        finalPrice: number,
        imageUrl: string
    }