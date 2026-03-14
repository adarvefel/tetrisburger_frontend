import { axiosClient } from "../../../../shared/api/axiosClient";
import { endPoints } from "../../../../shared/api/endPoints";
import { CreateCustomBurgerRequestDTO } from "../dto/burgerCustomDto";

export const createBurgerCustom = async(data: CreateCustomBurgerRequestDTO) =>{
    const response = axiosClient.post(endPoints.user.burgerCustom.create, data);
    return response;
}

export const addBurgerFavorite = async(idBurger: number) =>{
    const response = axiosClient.post(endPoints.user.burgerCustom.addFavorite, {idBurger});
    return response;
}

export const listBurgerFavorite = async() =>{
    const response = axiosClient.get(endPoints.user.burgerCustom.addFavorite);
    return response;
}