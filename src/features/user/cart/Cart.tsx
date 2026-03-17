import React, { useEffect } from 'react'
import "./cart.css"
import SubTittleCrud from '../../../shared/components/componetsCrud/subTittle/SubTittleCrud';
import Line from '../../../shared/components/componetsCrud/fields/line/Line';
import { BiSolidSpreadsheet } from "react-icons/bi";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { PiTrashDuotone } from "react-icons/pi";
import { useCartStore } from '../../../shared/store/useCartStore'
import { Link, useNavigate } from "react-router-dom";
import photoNotFound from "../../../assets/productNotFound.png"
import { useAuthStore } from '../../../shared/store/useAuthStore';


export default function Cart() {

    const items = useCartStore((state) => state.items)
    const loadCart = useCartStore((state) => state.loadCart)
    const clearCart = useCartStore((state) => state.clearCart)
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    const removeProduct = useCartStore((state) => state.removeProduct)
    const getTotal = useCartStore((state) => state.getTotal)

    const navigate = useNavigate()
    const { user } = useAuthStore()

    const handleCheckout = () => {
        if (!user) {
            navigate('/login')
        } else {
            navigate('/checkout')
        }
    }

    useEffect(() => {
        loadCart()
    }, [])

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

                    {items.length === 0 ? (

                        <div className="cart__empty">

                            <h2 className="cart__empty-title">
                                Tu carrito está vacío
                            </h2>

                            <p className="cart__empty-text">
                                Aún no has agregado productos
                            </p>

                            <Link
                                to="/products"
                                className="cart__empty-link"
                            >
                                Ver productos
                            </Link>

                        </div>

                    ) : (

                        items.map((item) => (

                            <div
                                key={`${item.typeProduct}-${item.idProduct}`}
                                className="cart__items-card"
                            >

                                <div className='cart__container-card-left'>
                                    <div className="cart__container-image">
                                        <img
                                            className='cart__img'
                                            src={item.imageUrl ?? photoNotFound}
                                            alt=""
                                        />
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

                        ))

                    )}

                </div>

            </div>

            <div className="cart__container-right">
                <div className="cart__container-checkout">
                    <SubTittleCrud title='RESUMEN' icon={<BiSolidSpreadsheet size={20} color='red' />} />
                    <Line />
                    <span className='cart__span'>Productos totales: <strong>{totalItems}</strong></span>
                    <span className='cart__span'>Sub total: <strong>---</strong></span>
                    <Line />
                    <span className='cart__span'>
                        <SubTittleCrud title='Total: ' />
                        <strong className='cart__strong-total'>{formatPriceCOP(total)}</strong>
                    </span>
                    <Line />
                    <button 
                        className='cart__button-checkout'
                        type='button'
                        onClick={handleCheckout}
                    >
                        PAGAR <MdOutlineShoppingCartCheckout size={23} />
                    </button>
                </div>
            </div>

        </form>
    )
}