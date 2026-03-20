import React from "react";
import "./modelDetailsProduct.css";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Line from "../componetsCrud/fields/line/Line";
import photoNotFound from "../../../assets/productNotFound.png"
import { useCartStore } from "../../store/useCartStore";

interface Props {
    onClose: () => void,
    typeProduct: "BURGER" | "PRODUCT" | "ADDITION",
    id: number,
    name: string,
    price: number,
    description: string,
    imageUrl: string,
    available: boolean,
    ingredients?:
    {
        imageUrl: string,
        name: string
        quantity: number
    }[]

}

export default function ModelDetailsProduct({ onClose, typeProduct, id, description, price, imageUrl, available, name, ingredients }: Props) {


    const formatPriceCOP = (price: number) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
        }).format(price);


    const addProduct = useCartStore((state) => state.addProduct);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation(); // evita que se abra el modal

        addProduct({
            typeProduct,
            idProduct: id,
            name,
            price,
            imageUrl
        });
    };

    return (
        <div onClick={onClose} className="modelDetailsProduct__overlay">

            <div onClick={onClose} className="modelDetailsProduct__container">

                <button className="modelDetailsProduct__close">
                    <IoMdClose size={22} />
                </button>

                <div className="modelDetailsProduct__imageContainer">
                    <img
                        src={imageUrl ?? photoNotFound}
                        className="modelDetailsProduct__image"
                    />
                </div>

                <div className="modelDetailsProduct__content">

                    <h2 className="modelDetailsProduct__title">{name}</h2>

                    <p className="modelDetailsProduct__price">
                        {formatPriceCOP(price)}
                    </p>

                    <p className="modelDetailsProduct__description">
                        {description}
                    </p>

                    {ingredients ? (
                        <>
                            <Line />

                            <div className="modelDetailsProduct__container-ingredients">

                                <h3 className="modelDetailsProduct__ingredients-h3">Ingredientes</h3>

                                <div className="modelDetailsProduct__ingredientsList">

                                    {ingredients.map((ingredient, index) => (

                                        <div
                                            key={index}
                                            className="modelDetailsProduct__ingredient"
                                        >

                                            <img
                                                src={ingredient.imageUrl ?? photoNotFound}
                                                className="modelDetailsProduct__ingredientImage"
                                            />

                                            <span>{`${ingredient.name} x${ingredient.quantity}`}</span>

                                        </div>

                                    ))}

                                </div>

                            </div>
                        </>
                    ) : null}

                    <Line />

                    <button id="modelDetailsProduct-add-cart" className="modelDetailsProduct__addCart" disabled={!available} onClick={handleAddToCart}>
                        <MdOutlineAddShoppingCart size={18} />
                        {available ? "Agregar al carrito" : "No disponible"}
                    </button>

                </div>

            </div>

        </div>
    );
}