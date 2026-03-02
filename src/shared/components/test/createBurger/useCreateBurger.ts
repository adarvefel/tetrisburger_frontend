import { useState } from "react";
import { axiosClient } from "../../../api/axiosClient";
import { endPoints } from "../../../api/endPoints";
import { CreateBurgerByAdminDTO, CreateBurgerWithImageDTO } from "../dto";
import { toast } from "sonner";

export default function useCreateBurger(){

     const createBurger = async (data: CreateBurgerWithImageDTO) =>{
    
        const formData = new FormData();
    
        formData.append(
            "data", new Blob([JSON.stringify(data.burger)], { type: "application/json"})
        );
    
        if (data.file) {
            formData.append("burgerImage", data.file);
        }
    
        const response = await axiosClient.post(endPoints.admin.burgers.create, formData);
        return response;
    }

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCreateBurger = async (data: CreateBurgerWithImageDTO) =>{

        try{
            setLoading(true);
            setError(null);
            const response = await createBurger(data);
            return response;

        }catch(err: any){
            const msg = err.response?.data?.message
            setError(msg);
            toast.error(msg);
        }finally{
            setLoading(false);
        }

    }

    return {loading, error, handleCreateBurger}



    
}