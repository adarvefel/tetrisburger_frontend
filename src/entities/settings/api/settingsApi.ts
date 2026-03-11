import { axiosClient } from "../../../shared/api/axiosClient"
import { endPoints } from "../../../shared/api/endPoints"

export const getSettingsAddition = async() =>{
    const response = await axiosClient.get(endPoints.admin.settings.getSettingsAddition);
    return response;
}