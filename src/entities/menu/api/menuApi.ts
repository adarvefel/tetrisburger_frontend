import { axiosClient } from "../../../shared/api/axiosClient"
import { endPoints } from "../../../shared/api/endPoints"

export const listProducts = async (page: number, productCategoryId?: number) => {
    const response = await axiosClient.get(endPoints.admin.product.listPrueba(page, productCategoryId));
    return response;
}