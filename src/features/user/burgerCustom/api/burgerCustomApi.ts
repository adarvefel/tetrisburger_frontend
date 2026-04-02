import { axiosClient } from "../../../../shared/api/axiosClient";
import { endPoints } from "../../../../shared/api/endPoints";
import { CreateCustomBurgerRequestDTO, UpdateCustomBurgerRequestDTO } from "../dto/burgerCustomDto";

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
 
export const deleteBurgerFavorite = async(id: number) =>{
    const response = axiosClient.delete(endPoints.user.burgerCustom.deleteFavorite(id));
    return response;
}

export const updateBurgerCustom = async(id: number, data: UpdateCustomBurgerRequestDTO) =>{
    const response = axiosClient.put(endPoints.user.burgerCustom.update(id), data);
    return response;
}

export const listFeatured = async() =>{
    const response = axiosClient.get(endPoints.user.burgerCustom.featured);
    return response;
}