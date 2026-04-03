import { useState } from "react";
import { axiosClient } from "../api/axiosClient";

interface BurgerIngredient {
    idBurgerIngredient: number;
    productName: string;
    quantity: number;
    priceAtTime: number;
    subtotal: number;
    imageUrl?: string;
}

interface BurgerDetail {
    idBurger: number;
    name: string;
    ingredients: BurgerIngredient[];
}

export function useBurgerDetail() {
    const [loading, setLoading] = useState(false);
    const [burger, setBurger] = useState<BurgerDetail | null>(null);

    const fetchBurger = async (idBurger: number) => {
        try {
            setLoading(true);
            const response = await axiosClient.get(`/api/admin/burgers/${idBurger}`);
            setBurger(response.data);
        } catch (err) {
            console.error("Error al obtener burger", err);
        } finally {
            setLoading(false);
        }
    };

    const clear = () => setBurger(null);

    return { loading, burger, fetchBurger, clear };
}