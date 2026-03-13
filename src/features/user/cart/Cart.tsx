import React from 'react'
import "./cart.css"
import TittleCrud from '../../../shared/components/componetsCrud/tittle/TittleCrud'
import { MdDelete } from "react-icons/md";
import burgerTest from "../../../assets/burgerGRANDE.jpg"
import SubTittleCrud from '../../../shared/components/componetsCrud/subTittle/SubTittleCrud';
import Line from '../../../shared/components/componetsCrud/fields/line/Line';
import { BiSolidSpreadsheet } from "react-icons/bi";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { PiTrashSimpleDuotone } from "react-icons/pi";
import { PiTrashDuotone } from "react-icons/pi";
import { IoIosTrash } from "react-icons/io";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { useCartStore } from '../../../shared/store/useCartStore'

export default function Cart() {

    const items = useCartStore((state) => state.items)
    const clearCart = useCartStore((state) => state.clearCart)
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    const removeProduct = useCartStore((state) => state.removeProduct)
    const getTotal = useCartStore((state) => state.getTotal)

    const total = getTotal()

    const totalItems = items.reduce(
        (acc, item) => acc + item.quantity,
        0
    )

    const formatPriceCOP = (price: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <form className='cart__form'>

            <div className="cart__container-left">

                <div className="cart__container-tittle">
                    <div>
                        <h1 className='cart__h1'>Tu orden</h1>
                        <p className='cart__p'>Revisa los articulos antes de pagar</p>
                    </div>
                    <button
                        className='cart__button-clean'
                        type='button'
                        onClick={clearCart}
                    >
                        Limpiar carrito
                    </button>
                </div>

                <div className="cart__container-products">

                    {items.map((item) => (

                        <div
                            key={`${item.typeProduct}-${item.idProduct}`}
                            className="cart__items-card"
                        >

                            <div className='cart__container-card-left'>
                                <div className="cart__container-image">
                                    <img className='cart__img' src={item.imageUrl} alt="" />
                                </div>

                                <div className="cart__container-data">

                                    <div className="cart__container-name">
                                        <span className='cart__span-name'>{item.name}</span>
                                        <span className='cart__span-type-orange'>{item.typeProduct}</span>
                                    </div>

                                    <span className='cart__span-price'>
                                        {formatPriceCOP(item.price)}
                                    </span>

                                </div>
                            </div>

                            <div className="cart__card-container-right">

                                <div className="cart__container-quantity">

                                    <button
                                        className="cart__btn-quantity"
                                        type='button'
                                        onClick={() => decreaseQuantity(item.typeProduct, item.idProduct)}
                                    >
                                        -
                                    </button>

                                    <span className='cart__span-quantity'>
                                        x{item.quantity}
                                    </span>

                                    <button
                                        className="cart__btn-quantity"
                                        type='button'
                                        onClick={() => increaseQuantity(item.typeProduct, item.idProduct)}
                                    >
                                        +
                                    </button>

                                </div>

                                <button
                                    className='cart__button-delete'
                                    type='button'
                                    onClick={() => removeProduct(item.typeProduct, item.idProduct)}
                                >
                                    <PiTrashDuotone size={25} />
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            <div className="cart__container-right">
                <div className="cart__container-checkout">
                    <SubTittleCrud title='RESUMEN' icon={<BiSolidSpreadsheet size={20} color='red' />} />
                    <Line />
                    <span className='cart__span'>Productos totales: <strong>{totalItems}</strong></span>
                    <span className='cart__span'>Sub total: <strong>---</strong></span>
                    <Line />
                    <span className='cart__span'><SubTittleCrud title='Total: ' /> <strong className='cart__strong-total'>{formatPriceCOP(total)}</strong></span>
                    <Line />
                    <button className='cart__button-checkout'>PAGAR <MdOutlineShoppingCartCheckout size={23} /></button>

                </div>
            </div>

        </form>
    )
}
