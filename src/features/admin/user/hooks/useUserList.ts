import { useEffect, useState } from "react";
import { UserFectchList } from "../dto/usersAdminDto";
import { listUsers } from "../../../../entities/user/api/userApi";

export function useUserList(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [users, setUsers] = useState<UserFectchList[]>([]);

    const [numberPage, setNumberPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const nextPage = ()=>{
        if (numberPage < totalPage - 1) {
            setNumberPage(prev => prev +1);
            console.log(numberPage);
        }
        return;
    }

    const prevPage = ()=>{
        if (numberPage > 0) {
            setNumberPage(prev => prev - 1);
            console.log(numberPage);
        }
        return;
    }


    const fetchUserList = async() =>{
        try{
            setLoading(true);
            setError(null);
            const response = await listUsers(numberPage);
            setUsers(response.data.users);
            setTotalPage(response.data.totalPages);
            return response;

        }catch(err: any){
            setError(err.message || "Error al traer los usuarios");
        }finally{
            setLoading(false);
        }
    }


    useEffect(()=>{
        fetchUserList();
    },[numberPage])

    return {loading, error, users, numberPage, totalPage, nextPage, prevPage, fetchUserList};
}