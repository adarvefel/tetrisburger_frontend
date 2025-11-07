//CRUD
import { axiosClient } from "../../../shared/api/axiosClient"
import { endPoints } from "../../../shared/api/endPoints"
import { CreateUserDto, UpdateUserDto } from "../dto/userDto"

export const listUsers = async (numberPage: number) =>{
    const response = await axiosClient.get(endPoints.admin.users.list(numberPage));
    return response;
}
export const createUser = async (user: CreateUserDto) =>{
    const response = await axiosClient.post(endPoints.admin.users.create, user);
    return response;
}
export const findUserById = async (id: number) =>{
    const response = await axiosClient.get(endPoints.admin.users.findById(id));
    return response;
}
export const updateUser = async (id : number, user: UpdateUserDto) =>{
    const response = await axiosClient.put(endPoints.admin.users.update(id), user);
    return response;
}
export const deleteUser = async (id: number) =>{
    const response = await axiosClient.delete(endPoints.admin.users.delete(id));
    return response;
}

