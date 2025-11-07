import { axiosClient } from "../../../../shared/api/axiosClient"
import { endPoints } from "../../../../shared/api/endPoints"
import { UpdateProfileRequestDto } from "../dto/profileDto";

export const getProfile = async() =>{
    const response = await axiosClient.get(endPoints.user.profile);
    return response;

}

export const updateProfile = async(dataToUpdate: UpdateProfileRequestDto) =>{
    const response = await axiosClient.patch(endPoints.user.updateProfile, dataToUpdate);
    return response;
}