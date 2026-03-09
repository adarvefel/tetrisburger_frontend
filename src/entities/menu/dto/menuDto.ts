export interface MenuItemResponseDTO{
    idMenuItem?: number,
    itemType: string,
    idBurger: number | null,
    idProduct: number,
    quantity: number,
    imageUrl: string,
    productName: string
}