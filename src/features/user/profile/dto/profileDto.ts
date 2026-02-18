export interface UpdateProfileRequestDto{
    userName?: string;
    password?: string;
    
    phone?: string;
}

export interface UpdateProfileWithImageRequestDto{
    user: UpdateProfileRequestDto,
    file?: File | null
}

export interface GetProfileResponeDto{
    idUser: number
    userName: string;
    email: string;
    userImage: string;
    role: string;
    phone: string;
}