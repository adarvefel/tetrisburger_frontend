import { useState } from "react";
import { BurgerIngredientsResponseDTO, IngredientsRequestUI, IngredientsResponseDTO } from "../../../../entities/burger/dto/burgerDto";
import { toast } from "sonner";

export function useBurgerCustomForm() {


    //GEstion pal model

    const [modelIngredients, setModelIngredients] = useState(false);

    const openModel = () => {
        setModelIngredients(true);
    }

    const closeModel = () => {
        setModelIngredients(false);
    }


    //lista de ingredients etc...

    const [ingredientsList, setIngredientsList] = useState<BurgerIngredientsResponseDTO[]>([]);

    const addIngredient = (newIngredient: IngredientsResponseDTO) => {
        const alreadyExists = ingredientsList.some(ing => ing.idProduct === newIngredient.idProduct);

        if (alreadyExists) {
            toast.error("El producto ya esta en la lista.");
            return
        };

        setIngredientsList(prev => [
            ...prev,
            {

                idProduct: newIngredient.idProduct,
                productName: newIngredient.name,
                priceAtTime: newIngredient.price,
                quantity: 1,
                isOptional: false,
                imageUrl: newIngredient.imageUrl,

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

    const changeIsOptional = (id: number) => {
        setIngredientsList(prev =>
            prev.map((ingredient) => (
                ingredient.idProduct === id ? { ...ingredient, isOptional: !ingredient.isOptional } : ingredient
            ))
        );
    }

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
        changeIsOptional
    };
}