import { axiosClient } from "../../../../shared/api/axiosClient"
import { endPoints } from "../../../../shared/api/endPoints"
import { UpdateProfileRequestDto, UpdateProfileWithImageRequestDto } from "../dto/profileDto";

export const getProfile = async() =>{
    const response = await axiosClient.get(endPoints.user.profile.me);
    return response;

}

export const updateProfile = async(dataToUpdate: UpdateProfileWithImageRequestDto) =>{

    if (dataToUpdate.file) {
        const formData = new FormData();

        formData.append("userImage", dataToUpdate.file);
        await axiosClient.put(endPoints.user.profile.updateProfileImage, formData);
    }

    const response = await axiosClient.patch(endPoints.user.profile.updateProfile, dataToUpdate.user);
    return response;
}