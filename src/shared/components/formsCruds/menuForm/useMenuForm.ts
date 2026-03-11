import { useState } from "react";
import { BurgerResponseDTO, IngredientsResponseDTO } from "../../../../entities/burger/dto/burgerDto";
import { toast } from "sonner";
import { MenuItemRequestDTO, MenuItemResponseDTO } from "../../../../entities/menu/dto/menuDto";

export function useMenuForm() {

    // Gestión del modal
    const [modelIngredients, setModelIngredients] = useState<"ingredients" | "burgers" | null>(null);

    const openModel = (type: "ingredients" | "burgers") => {
        setModelIngredients(type);
    };

    const closeModel = () => {
        setModelIngredients(null);
    };

    // Lista de items del menú (REQUEST DTO)
    const [ingredientsList, setIngredientsList] = useState<MenuItemResponseDTO[]>([]);

    const addProduct = (product: IngredientsResponseDTO) => {

        const alreadyExists = ingredientsList.some(
            item => item.itemType === "PRODUCT" && item.product?.idProduct === product.idProduct
        );

        if (alreadyExists) {
            toast.error("El producto ya está en el menú.");
            return;
        }

        setIngredientsList(prev => [
            ...prev,
            {
                itemType: "PRODUCT",
                burger: null,
                product: {
                    idProduct: product.idProduct,
                    name: product.name,
                    finalPrice: product.price,
                    imageUrl: product.imageUrl
                },
                quantity: 1
            }
        ]);
    };

    const addBurger = (burger: BurgerResponseDTO) => {

        const alreadyExists = ingredientsList.some(
            item => item.itemType === "BURGER" && item.burger?.idBurger === burger.idBurger
        );

        if (alreadyExists) {
            toast.error("La hamburguesa ya está en el menú.");
            return;
        }

        setIngredientsList(prev => [
            ...prev,
            {
                itemType: "BURGER",
                burger: {
                    idBurger: burger.idBurger,
                    name: burger.name,
                    finalPrice: burger.finalPrice,
                    imageUrl: burger.imageUrl
                },
                product: null,
                quantity: 1
            }
        ]);
    };

    const removeItem = (item: MenuItemResponseDTO) => {
        setIngredientsList(prev =>
            prev.filter(i =>
                !(
                    i.itemType === item.itemType &&
                    i.burger?.idBurger === item.burger?.idBurger &&
                    i.product?.idProduct === item.product?.idProduct
                )
            )
        );
    };

    const plusQuantity = (item: MenuItemResponseDTO) => {
        setIngredientsList(prev =>
            prev.map(i =>
                i.itemType === item.itemType &&
                    i.burger?.idBurger === item.burger?.idBurger &&
                    i.product?.idProduct === item.product?.idProduct
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            )
        );
    };

    const minusQuantity = (item: MenuItemResponseDTO) => {
        setIngredientsList(prev =>
            prev.map(i =>
                i.itemType === item.itemType &&
                    i.burger?.idBurger === item.burger?.idBurger &&
                    i.product?.idProduct === item.product?.idProduct &&
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