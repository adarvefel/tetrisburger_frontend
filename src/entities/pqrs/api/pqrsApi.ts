import { axiosClient } from "../../../shared/api/axiosClient";
import { endPoints } from "../../../shared/api/endPoints";
import { CreatePqrsDto } from "../dto/pqrsDto";

//User

export const createPqrs = async (pqrs: CreatePqrsDto) => {
    const response = await axiosClient.post(endPoints.user.pqrs.create, pqrs);
    return response;
}

export const listPqrsMe = async (numberPage: number) => {
    const response = await axiosClient.get(endPoints.user.pqrs.listMe(numberPage));
    return response;
}

//Admin

export const listPqrs = async (
    page: number,
    type?: string,
    status?: string,
    priority?: string) => {
    const response = await axiosClient.get(endPoints.admin.pqrs.list(page, type, status, priority));
    return response;
};

export const deletePqrs = async (id: number) =>{
    const response = await axiosClient.delete(endPoints.admin.pqrs.delete(id));
    return response;
}
