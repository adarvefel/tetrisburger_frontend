import { axiosClient } from "../../../shared/api/axiosClient"
import { endPoints } from "../../../shared/api/endPoints"
import { CreateMenuRequestWithImageDTO } from "../dto/menuDto";

export const listProducts = async (page: number, productCategoryId?: number) => {
    const response = await axiosClient.get(endPoints.admin.product.listPrueba(page, productCategoryId));
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