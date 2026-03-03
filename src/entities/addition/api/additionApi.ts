import { axiosClient } from "../../../shared/api/axiosClient"
import { endPoints } from "../../../shared/api/endPoints"
import { CreateAdditionRequestWithImage } from "../dto/additionDto"

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