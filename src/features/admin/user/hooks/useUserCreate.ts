import { useState } from "react";
import { createUser } from "../../../../entities/user/api/userApi";
import { CreateUserDto, CreateUserWithImageDto } from "../../../../entities/user/dto/userDto";
import { toast } from "sonner";

export function useUserCreate() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handleUserCreate = async (data: CreateUserWithImageDto) => {

        try {
            setLoading(true);
            setError(null);
            const response = await createUser(data);
            return response;

        } catch (err: any) {
            const massage = err.response?.data?.message || "Error al actualizar datos de este usuario.";
            setError(massage);
            toast.error(massage);
        } finally {
            setLoading(false);
        }

    }

    return { loading, error, handleUserCreate };
}