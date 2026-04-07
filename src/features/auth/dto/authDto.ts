import { User } from "../../../entities/user/model/types";

export interface LoginResponseDto{
    token: string,
    expiresIn: number,
    user: User,
    timestamp: string

}