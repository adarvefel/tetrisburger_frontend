export interface CreateAdditionRequest {
    name: string,
    description: string,
    price: number,
    available: boolean
}

export interface CreateAdditionRequestWithImage {
    addition: CreateAdditionRequest,
    image: File | null
}

export interface AddtionResponse {
    idAddition: number;
    name: string,
    description: string,
    price: number,
    available: boolean,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    createdBy: number,
    updatedBy: number
}

export interface UpdateAdditionRequestDTO {
    name: string,
    description: string,
    price: number,
    available: boolean
}

export interface UpdateAdditionRequestWithImageDTO {
    addition: UpdateAdditionRequestDTO,
    file: File | null
}
