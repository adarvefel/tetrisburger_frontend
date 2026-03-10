import { data } from "react-router-dom";
import { axiosClient } from "../../../shared/api/axiosClient"
import { endPoints } from "../../../shared/api/endPoints"
import { CreateMenuRequestWithImageDTO } from "../dto/menuDto";

export const listProducts = async (page: number, productCategoryId?: number) => {
    const response = await axiosClient.get(endPoints.admin.menu.listPrueba(page, productCategoryId));
    return response;
}

export const listBurgers = async (page: number) =>{
    const response = await axiosClient.get(endPoints.admin.burgers.list(page, 5));
    return response;
}

export const searchBurgerByName = async (name: string, numberPage: number) => {
    const response = await axiosClient.get(endPoints.admin.burgers.searchByName(name, numberPage, 5));
    return response;
}

export const createMenu = async (data: CreateMenuRequestWithImageDTO) => {
    const formData = new FormData();

    formData.append(
        "data", new Blob([JSON.stringify(data.menu)], { type: "application/json" })
    );

    if (data.file) {
        formData.append("image", data.file);
    }

    const response = await axiosClient.post(endPoints.admin.menu.create, formData);
    return response;
}

export const listMenus = async (numberPage: number) =>{
    const response = await axiosClient.get(endPoints.admin.menu.list(numberPage));
    return response;
}

export const deleteMenu = async(id: number) =>{
    const response = await axiosClient.delete(endPoints.admin.menu.delete(id));
    return response;
}