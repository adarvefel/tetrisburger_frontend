import { axiosClient } from "../../../shared/api/axiosClient";
import { endPoints } from "../../../shared/api/endPoints";
import { UpdatePqrsAdminRequestDto } from "../dto/pqrsDto";



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

export const updatePqrs = async (id: number, pqrs: UpdatePqrsAdminRequestDto) =>{
    const response = await axiosClient.patch(endPoints.admin.pqrs.update(id), pqrs);
    return response;
}

export const findPqrsById = async (id: number) =>{
    const response = await axiosClient.get(endPoints.admin.pqrs.findById(id));
    return response;
}
