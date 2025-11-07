import { User } from "../../../entities/user/model/types";
import { axiosClient } from "../../../shared/api/axiosClient";
import { endPoints } from "../../../shared/api/endPoints";

export const registrarUsuario = async(usuario: User) =>{
    const response = await axiosClient.post(endPoints.auth.register, usuario)
    return  response;
}

export const loginUsuario = async(email: string, password: string) =>{
    const response = await axiosClient.post(endPoints.auth.login, {email, password})
    return response.data;
}

export const loginGoogle = async (token: string)=>{
    const response = await axiosClient.post(endPoints.auth.authGoogle, {token})
    return response.data;
}

export const forgotPasswordUsuario = async (email: string)=>{
    const response = await axiosClient.post(endPoints.auth.forgotPassword, {email})
    return response;
}

export const resetPasswordUsuario = async(token: string, newPassword : string) =>{
    const response = await axiosClient.post(endPoints.auth.resetPassword, {token, newPassword});
    return response;
}