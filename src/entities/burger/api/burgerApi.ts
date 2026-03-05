import { endPoints } from "../../../shared/api/endPoints";
import { CreateBurgerWithImageDTO } from "../dto/burgerDto";
import { axiosClient } from "../../../shared/api/axiosClient";

export const createBurger = async (data: CreateBurgerWithImageDTO) => {

    const formData = new FormData();

    formData.append(
        "data", new Blob([JSON.stringify(data.burger)], { type: "application/json" })
    );

    if (data.file) {
        formData.append("burgerImage", data.file);
    }

    const response = await axiosClient.post(endPoints.admin.burgers.create, formData);
    return response;
}

export const listIngredientsBurger = async (
    page: number,
    productCategoryId?: number) => {
    const response = await axiosClient.get(endPoints.admin.burgers.listIngredients(page, productCategoryId));
    return response;
};


export const listBurgers = async (numberPage: number) => {
    const response = await axiosClient.get(endPoints.admin.burgers.list(numberPage));
    return response;
}

export const deleteBurger = async (id: number) =>{
    const response = await axiosClient.delete(endPoints.admin.burgers.delete(id));
    return response;
}

export const searchByName = async (name: string, numberPage: number) =>{
    const response = await axiosClient.get(endPoints.admin.burgers.searchByName(name, numberPage));
    return response;
}

export const findByIdBurger = async (id: number) =>{
    const response = await axiosClient.get(endPoints.admin.burgers.findById(id));
    return response;
}