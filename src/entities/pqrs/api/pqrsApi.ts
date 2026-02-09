import { axiosClient } from "../../../shared/api/axiosClient";
import { endPoints } from "../../../shared/api/endPoints";
import { CreatePqrsDto } from "../dto/pqrsDto";

export const createPqrs = async (pqrs: CreatePqrsDto) => {
    const response = await axiosClient.post(endPoints.user.pqrs.create, pqrs);
    return response;
}

export const listPqrsMe = async(numberPage: number) =>{
    const response = await axiosClient.get(endPoints.user.pqrs.listMe(numberPage));
    return response;
}