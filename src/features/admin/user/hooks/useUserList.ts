import { useEffect, useState } from "react";
import { UserFectchList } from "../dto/usersAdminDto";
import { listUsers, searchByEmail } from "../../../../entities/user/api/userApi";

export function useUserList(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [users, setUsers] = useState<UserFectchList[]>([]);

    const [numberPage, setNumberPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const [email, setEmail] = useState("");

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
            
        }
        return;
    }


    const fetchUserList = async() =>{
        try{
            setLoading(true);
            setError(null);

            let response;

            if (email.trim() !== "") {
                
                response = await searchByEmail(email, numberPage);
                setUsers(response.data.content);
                setTotalPage(response.data.totalPages);
            } else {
                
                response = await listUsers(numberPage);
                setUsers(response.data.users);
                setTotalPage(response.data.totalPages);
            }

        }catch(err: any){
            setError(err.message || "Error al traer los usuarios");
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserList();
    }, [numberPage, email]);

    return {loading, error, users, numberPage, totalPage, setEmail, email, nextPage, prevPage, fetchUserList};
}