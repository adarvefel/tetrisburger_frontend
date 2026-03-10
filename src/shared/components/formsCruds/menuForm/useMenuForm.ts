import { useState } from "react";
import { BurgerResponseDTO, IngredientsResponseDTO } from "../../../../entities/burger/dto/burgerDto";
import { toast } from "sonner";
import { MenuItemResponseDTO } from "../../../../entities/menu/dto/menuDto";

export function useMenuForm() {


    //GEstion pal model

    const [modelIngredients, setModelIngredients] = useState<"ingredients" | "burgers" | null>(null);

    const openModel = (type: "ingredients" | "burgers") => {
        setModelIngredients(type);
    }

    const closeModel = () => {
        setModelIngredients(null);
    }


    //lista de ingredients etc...

    const [ingredientsList, setIngredientsList] = useState<MenuItemResponseDTO[]>([]);

    const addProduct = (product: IngredientsResponseDTO) => {

        const alreadyExists = ingredientsList.some(
            item => item.itemType === "PRODUCT" && item.idProduct === product.idProduct
        );

        if (alreadyExists) {
            toast.error("El producto ya está en el menú.");
            return;
        }

        setIngredientsList(prev => [
            ...prev,
            {
                itemType: "PRODUCT",
                idBurger: null,
                idProduct: product.idProduct,
                quantity: 1
            }
        ]);
    };

    const addBurger = (burger: BurgerResponseDTO) => {

        const alreadyExists = ingredientsList.some(
            item => item.itemType === "BURGER" && item.idBurger === burger.idBurger
        );

        if (alreadyExists) {
            toast.error("La hamburguesa ya está en el menú.");
            return;
        }

        setIngredientsList(prev => [
            ...prev,
            {
                itemType: "BURGER",
                idBurger: burger.idBurger,
                idProduct: null,
                quantity: 1
            }
        ]);
    };

    const removeItem = (item: MenuItemResponseDTO) => {
        setIngredientsList(prev =>
            prev.filter(i =>
                !(i.itemType === item.itemType &&
                    i.idProduct === item.idProduct &&
                    i.idBurger === item.idBurger)
            )
        );
    };


    const plusQuantity = (item: MenuItemResponseDTO) => {

        setIngredientsList(prev =>
            prev.map(i =>
                i.itemType === item.itemType &&
                    i.idBurger === item.idBurger &&
                    i.idProduct === item.idProduct
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            )
        );
    };

    const minusQuantity = (item: MenuItemResponseDTO) => {

        setIngredientsList(prev =>
            prev.map(i =>
                i.itemType === item.itemType &&
                    i.idBurger === item.idBurger &&
                    i.idProduct === item.idProduct &&
                    i.quantity > 1
                    ? { ...i, quantity: i.quantity - 1 }
                    : i
            )
        );
    };





    return {
        // Modal
        modelIngredients,
        openModel,
        closeModel,

        // Lista de ingredientes
        ingredientsList,
        setIngredientsList,
        addProduct,
        addBurger,
        removeItem,
        plusQuantity,
        minusQuantity,
    };
}