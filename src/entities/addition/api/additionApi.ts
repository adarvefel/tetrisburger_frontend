import { axiosClient } from "../../../shared/api/axiosClient"
import { endPoints } from "../../../shared/api/endPoints"
import { CreateAdditionRequestWithImage, UpdateAdditionRequestWithImageDTO } from "../dto/additionDto"

export const createAddition = async (data: CreateAdditionRequestWithImage) => {
    const formData = new FormData();

    formData.append(
        "data", new Blob([JSON.stringify(data.addition)], { type: "application/json"})
    );

    if (data.image) {
        formData.append("additionImage", data.image);
    }

    const response = await axiosClient.post(endPoints.admin.addition.create, formData);
    return response;
}

export const listAdditions = async (numberPage: number) =>{
    const response = await axiosClient.get(endPoints.admin.addition.list(numberPage));
    return response;
}

export const deleteAddition = async (id: number) =>{
    const response = await axiosClient.delete(endPoints.admin.addition.delete(id));
    return response;
}

export const searchByName = async (name: string, numberPage: number) =>{
    const response = await axiosClient.get(endPoints.admin.addition.searchByName(name, numberPage));
    return response;
}

export const findAdditionById = async (id: number) =>{
    const response = await axiosClient.get(endPoints.admin.addition.findById(id));
    return response;
}

export const updateAddition = async (id: number, data: UpdateAdditionRequestWithImageDTO) =>{

     if (data.file) {
        const formData = new FormData();

        formData.append("additionImage", data.file);
        await axiosClient.put(endPoints.admin.addition.updateImage(id), formData);
    }

    const response = await axiosClient.patch(endPoints.admin.addition.update(id), data.addition );
    return response;
}
