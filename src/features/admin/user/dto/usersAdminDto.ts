export interface UserFectchList {
    idUser: number;
    userName: string;
    email: string;
    userImage: string
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserFindByIdResponse{
    idUser : number,
    userName: string,
    email: string,
    password: string,
    userImage: string,
    role: string,
}