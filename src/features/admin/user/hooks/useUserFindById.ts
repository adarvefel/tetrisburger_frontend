import { useEffect, useState } from "react";
import { findUserById } from "../../../../entities/user/api/userApi";
import { UpdateUserDto } from "../../../../entities/user/dto/userDto";
import { UserFindByIdResponse } from "../dto/usersAdminDto";

export function useUserFindById() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [user, setUser] = useState<UserFindByIdResponse>();

    const handleUserFindById = async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            const response = await findUserById(id);
            setUser(response.data);
            return response;

        } catch (err: any) {
            setError(err.message || "Error al econtrar usuario")

        } finally {
            setLoading(false);
        }


    }



    return { loading, error, user, handleUserFindById };

}