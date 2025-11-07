export interface UpdateProfileRequestDto{
    userName?: string;
    password?: string;
    userImage?: string;
    phone?: string;
}

export interface GetProfileResponeDto{
    idUser: number
    userName: string;
    email: string;
    userImage: string;
    role: string;
    phone: string;
}