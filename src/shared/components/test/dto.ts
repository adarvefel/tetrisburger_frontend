export interface IngredientsResponseDTO {
  idProduct: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  availability: boolean;
  productType: string;

  productCategory: {
    id: number;
    name: string;
    description: string;
    available: boolean;
  };

  supplier: {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  
  imageUrl: string;
}