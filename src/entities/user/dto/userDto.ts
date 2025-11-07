export interface CreateUserDto{
    
    userName: string,
    email: string,
    password: string,
    userImage: string,
    role: string,
    phone: string
}

export interface UpdateUserDto{
    userName?: string,
    email?: string,
    password?: string,
    userImage?: string,
    role?: string,
    phone?: string
}