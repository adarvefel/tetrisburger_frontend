import { axiosClient } from "../../../shared/api/axiosClient";
import { endPoints } from "../../../shared/api/endPoints";
import { CreateProductDto, UpdateProductDto } from "../dto/productDto";

export const listProducts = async (numberPage: number) =>{
    const response = await axiosClient.get(endPoints.admin.product.list(numberPage));
    return response;
}
export const createProduct = async (product: CreateProductDto) =>{
    const response = await axiosClient.post(endPoints.admin.product.create, product);
    return response;
}
export const findProductById = async (id: number) =>{
    const response = await axiosClient.get(endPoints.admin.product.findById(id));
    return response;
}
export const updateProduct = async (id: number, product: UpdateProductDto) =>{
    const response = await axiosClient.put(endPoints.admin.product.update(id), product);
    return response;
}
export const deleteProduct = async (id: number) =>{
    const response = await axiosClient.delete(endPoints.admin.product.delete(id));
    return response;
}