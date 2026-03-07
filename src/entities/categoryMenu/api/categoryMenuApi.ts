import { axiosClient } from "../../../shared/api/axiosClient"
import { endPoints } from "../../../shared/api/endPoints"
import { CreateMenuCategoryRequestDTO, UpdateMenuCategoryRequestDTO } from "../dto/categoryMenuDto"

export const createCategoryMenu = async(data: CreateMenuCategoryRequestDTO) =>{
    const response = await axiosClient.post(endPoints.admin.categoryMenu.create, data);
    return response;
}

export const updateCategoryMenu = async(id: number, data: UpdateMenuCategoryRequestDTO) =>{
    const response = await axiosClient.put(endPoints.admin.categoryMenu.update(id), data);
    return response;
}

export const findByIdCategoryMenu = async(id: number) =>{
    const response = await axiosClient.get(endPoints.admin.categoryMenu.findById(id));
    return response;
}

export const deleteCategoryMenu = async(id: number) =>{
    const response = await axiosClient.delete(endPoints.admin.categoryMenu.delete(id));
    return response;
}

export const listCategoryMenu = async(numberPage: number) =>{
    const response = await axiosClient.get(endPoints.admin.categoryMenu.list(numberPage));
    return response;
}

