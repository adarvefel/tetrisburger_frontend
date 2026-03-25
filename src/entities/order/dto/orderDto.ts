export interface CartItemRequestDTO{
    typeProduct: string,
    idProduct: number,
    name: string,
    price: number,
    imageUrl: string,
    quantity: number
}

export interface CreateOrderRequestDTO{
    items: CartItemRequestDTO[]
}

export interface OrderItemResponseDTO {
  idOrderItem: number;
  itemType: "BURGER" | "PRODUCT" | "ADDITION";
  itemName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderResponseDTO {
  idOrder: number;
  orderNumber: string;
  status: "PENDING" | "PREPARING" | "READY" | "DELIVERED" | string;
  totalAmount: number;
  orderDate: string; 
  items: OrderItemResponseDTO[];
}