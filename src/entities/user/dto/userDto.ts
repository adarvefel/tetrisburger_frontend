export interface CreateUserDto{
    
    userName: string,
    email: string,
    password: string,
    
    role: string,
    phone: string
}

export interface UpdateUserDto{
    userName?: string,
    email?: string,
    password?: string,
    
    role?: string,
    phone?: string
}

export interface CreateUserWithImageDto{
    user: CreateUserDto,
    file?: File | null
}

export interface UpdateUserWithImageDto{
    user: UpdateUserDto,
    file?: File | null
}