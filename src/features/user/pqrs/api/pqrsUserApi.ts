//User

import { axiosClient } from "../../../../shared/api/axiosClient";
import { endPoints } from "../../../../shared/api/endPoints";
import { CreatePqrsDto, UpdatePqrsUserRequestDto } from "../dto/pqrsUserDto";

export const createPqrs = async (pqrs: CreatePqrsDto) => {
    const response = await axiosClient.post(endPoints.user.pqrs.create, pqrs);
    return response;
}

export const listPqrsMe = async (numberPage: number) => {
    const response = await axiosClient.get(endPoints.user.pqrs.listMe(numberPage));
    return response;
}

export const findPqrsByIdMe = async (id: number) =>{
    const response = await axiosClient.get(endPoints.user.pqrs.findById(id));
    return response;
}


export const updatePqrsMe = async (id: number, pqrsUpdate: UpdatePqrsUserRequestDto) => {
    const response = await axiosClient.patch(endPoints.user.pqrs.update(id), pqrsUpdate);
    return response;
}

export const deletePqrsMe = async (id: number) =>{
    const response = await axiosClient.delete(endPoints.user.pqrs.delete(id));
    return response;
}