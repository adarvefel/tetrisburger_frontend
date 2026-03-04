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
    const response = await axiosClient.get(endPoints.admin.product.listPrueba(page, productCategoryId));
    return response;
  };


  export const lisBurgers = async (numberPage: number) =>{
    const response = await axiosClient.get(endPoints.admin.burgers.list(numberPage));
    return response;
  }