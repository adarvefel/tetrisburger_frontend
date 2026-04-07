import { axiosClient } from "../../../shared/api/axiosClient";
import { endPoints } from "../../../shared/api/endPoints";
import { CreateProductDto, CreateProductWihtImageDto, UpdateProductDto, UpdateProductWithImageDto } from "../dto/productDto";

export const listProducts = async (
    numberPage: number,
    productCategoryId?: number
) => {

    const response = await axiosClient.get(endPoints.admin.product.list, {
        params: {
            page: numberPage,
            size: 10,
            sortBy: "id",
            direction: "ASC",
            productCategoryId
        }
    });

    return response;
}
export const createProduct = async (data: CreateProductWihtImageDto) => {

    const formData = new FormData();

    formData.append(
        "data", new Blob([JSON.stringify(data.product)], { type: "application/json" })
    );

    if (data.file) {
        formData.append("productImage", data.file);
    }

    const response = await axiosClient.post(endPoints.admin.product.create, formData);
    return response;
}
export const findProductById = async (id: number) => {
    const response = await axiosClient.get(endPoints.admin.product.findById(id));
    return response;
}
export const updateProduct = async (id: number, data: UpdateProductWithImageDto) => {

    if (data.file) {
        const formData = new FormData();

        formData.append("productImage", data.file);
        await axiosClient.put(endPoints.admin.product.updateImage(id), formData);
    }

    const response = await axiosClient.put(endPoints.admin.product.update(id), data.product);
    return response;
}
export const deleteProduct = async (id: number) => {
    const response = await axiosClient.delete(endPoints.admin.product.delete(id));
    return response;
}

export const searchByName = async (name: string, numberPage: number) => {
    const response = await axiosClient.get(endPoints.admin.product.searchByName(name, numberPage));
    return response;
}