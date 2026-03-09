import { useState } from "react";
import { BurgerIngredientsResponseDTO, BurgerResponseDTO, IngredientsResponseDTO } from "../../../../entities/burger/dto/burgerDto";
import { toast } from "sonner";
import { axiosClient } from "../../../api/axiosClient";
import { MenuItemResponseDTO } from "../../../../entities/menu/dto/menuDto";

export function useMenuForm() {


    //GEstion pal model

    const [modelIngredients, setModelIngredients] = useState(false);

    const openModel = () => {
        setModelIngredients(true);
    }

    const closeModel = () => {
        setModelIngredients(false);
    }


    //lista de ingredients etc...

    const [ingredientsList, setIngredientsList] = useState<MenuItemResponseDTO[]>([]);

    const addIngredient = (newIngredient: IngredientsResponseDTO) => {
        const alreadyExists = ingredientsList.some(ing => ing.idProduct === newIngredient.idProduct);

        if (alreadyExists) {
            toast.error("El producto ya esta en la lista.");
            return
        };

        setIngredientsList(prev => [
            ...prev,
            {

                itemType: "PRODUCT",
                idBurger: null,
                idProduct: newIngredient.idProduct,
                quantity: 1,
                imageUrl: newIngredient.imageUrl,
                productName: newIngredient.name

            }
        ]);
    }

    const removeIngredient = (id: number) => {
        setIngredientsList(prev =>
            prev.filter(ing => ing.idProduct !== id)
        );
    };


    const plusQuantity = (id: number) => {
        setIngredientsList(prev =>
            prev.map((ingredient) => (
                ingredient.idProduct === id ? { ...ingredient, quantity: ingredient.quantity + 1 } : ingredient
            ))
        );
    }

    const minusQuantity = (id: number) => {
        setIngredientsList(prev =>
            prev.map((ingredient) => (
                ingredient.idProduct === id && ingredient.quantity > 1 ? { ...ingredient, quantity: ingredient.quantity - 1 }
                    : ingredient
            ))
        );
    }

    //PARA EL SELECT DE MIERDA

    type BurgerOption = {
        value: number
        label: string
    }

    
    const loadBurgers = async (inputValue: string): Promise<BurgerOption[]> => {

        const { data } = await axiosClient.get(
            `/api/admin/burgers/menu/search?name=${inputValue}&page=0&size=10`
        );

        return data.content.map((burger: BurgerResponseDTO) => ({
            value: burger.idBurger,
            label: burger.name
        }));
    };




    return {
        // Modal
        modelIngredients,
        openModel,
        closeModel,

        // Lista de ingredientes
        ingredientsList,
        setIngredientsList,
        addIngredient,
        removeIngredient,
        plusQuantity,
        minusQuantity,
        loadBurgers
    };
}