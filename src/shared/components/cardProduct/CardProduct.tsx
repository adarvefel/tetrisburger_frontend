import "./cardProduct.css"
import { MdOutlineAddShoppingCart } from "react-icons/md";
import photoNotFound from "../../../assets/productNotFound.png"
import { useState } from "react";
import ModelDetailsProduct from "../modelDetailsProduct/ModelDetailsProduct";

interface Props {
    typeProduct: "BURGER" | "PRODUCT" | "ADICION",
    id: number,
    name: string,
    price: number,
    description: string,
    imageUrl: string,
    available: boolean
    ingredients?:
    {
        imageUrl: string,
        name: string
        quantity: number
    }[],


}

export default function CardProduct({ typeProduct, id, description, price, imageUrl, available,  name, ingredients }: Props) {


    const [model, setModel] = useState(false);

    const onOpen = () => {
        setModel(true)
    }

    const onClose = () => {
        setModel(false)
    }



    const formatPriceCOP = (price: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
        }).format(price);
    };

    return (

        <>
            <div onClick={onOpen} className="cardProduct__container">

                <div className="cardProduct__container-image">
                    <img
                        className="cardProduct__img"
                        src={imageUrl ?? photoNotFound}
                    />
                </div>

                <h2 className="cardProduct__h2">{name}</h2>

                <p className="cardProduct__price">
                    {formatPriceCOP(price)}
                </p>

                <button className="cardProduct__button" disabled={!available}>
                    <MdOutlineAddShoppingCart size={14} />
                    {available ? "Agregar al carrito" : "No disponible"}
                </button>

            </div>

            {
                model ? <ModelDetailsProduct
                    onClose={onClose}
                    id={id}
                    description={description}
                    name={name}
                    imageUrl={imageUrl}
                    available={available}
                    price={price}
                    typeProduct={typeProduct}
                    ingredients={ingredients}
                />
                    : null
            }
        </>

    )
}