import { User } from "../../../entities/user/model/types";
import { axiosClient } from "../../../shared/api/axiosClient";
import { endPoints } from "../../../shared/api/endPoints";

export const registrarUsuario = async(usuario: User, recaptchaToken: string) =>{
    const response = await axiosClient.post(endPoints.auth.register, {...usuario, recaptchaToken})
    return response;
}

export const loginUsuario = async(email: string, password: string, recaptchaToken: string) =>{
    const response = await axiosClient.post(endPoints.auth.login, {email, password, recaptchaToken})
    return response.data;
}

export const loginGoogle = async (token: string)=>{
    const response = await axiosClient.post(endPoints.auth.authGoogle, {token})
    return response.data;
}

export const forgotPasswordUsuario = async (email: string, recaptchaToken: string)=>{
    const response = await axiosClient.post(endPoints.auth.forgotPassword, {email, recaptchaToken})
    return response;
}

export const resetPasswordUsuario = async(token: string, newPassword : string) =>{
    const response = await axiosClient.post(endPoints.auth.resetPassword, {token, newPassword});
    return response;
}