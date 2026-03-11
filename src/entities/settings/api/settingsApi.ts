import { axiosClient } from "../../../shared/api/axiosClient"
import { endPoints } from "../../../shared/api/endPoints"
import { UpdateAdditionSettingsRequestDTO, UpdateBurgerSettingsRequestDTO } from "../dto/settingsDto";

export const getSettingsAddition = async() =>{
    const response = await axiosClient.get(endPoints.admin.settings.getSettingsAddition);
    return response;
}

export const updateSettingsAddition = async(data: UpdateAdditionSettingsRequestDTO) =>{
    const response = await axiosClient.put(endPoints.admin.settings.updateSettingsAddition, data);
    return response;
}

export const getSettingsBurger = async() =>{
    const response = await axiosClient.get(endPoints.admin.settings.getSettingsBurger);
    return response;
}

export const updateSettingsBurger = async(data: UpdateBurgerSettingsRequestDTO) =>{
    const response = await axiosClient.put(endPoints.admin.settings.updateSettingsBurger, data);
    return response;
}