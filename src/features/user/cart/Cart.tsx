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

export default function Cart() {
    return (
        <form className='cart__form'>

            <div className="cart__container-left">

                <div className="cart__container-tittle">
                    <div>
                        <h1 className='cart__h1'>Tu orden</h1>
                        <p className='cart__p'>Revisa los articulos antes de pagar</p>
                    </div>
                    <button className='cart__button-clean' type='button'>Limpiar carrito</button>
                </div>

                <div className="cart__container-products">

                    <div className="cart__items-card">

                        <div className='cart__container-card-left'>
                            <div className="cart__container-image">
                                    <img className='cart__img' src={burgerTest} alt="" />
                            </div>

                            <div className="cart__container-data">

                                <div className="cart__container-name">
                                    <span className='cart__span-name'>Nombre del product</span>

                                    <span className='cart__span-type-orange'>TypeProduct</span>
                                </div>

                                <span className='cart__span-price'>$33,999</span>

                            </div>
                        </div>

                        <div className="cart__card-container-right">

                            <div className="cart__container-quantity">
                                <button className="cart__btn-quantity" type='button'> - </button>

                                <span className='cart__span-quantity'>x3</span>

                                <button className="cart__btn-quantity" type='button'> + </button>
                            </div>

                            <button className='cart__button-delete' type='button'> <PiTrashDuotone   size={25}  color='black'/> </button>
                        </div>

                    </div>

                </div>

            </div>

            <div className="cart__container-right">
                <div className="cart__container-checkout">
                    <SubTittleCrud title='RESUMEN' icon={<BiSolidSpreadsheet size={20} color='red'/>}/>
                    <Line/>
                    <span className='cart__span'>Productos totales: <strong>3</strong></span>
                    <span className='cart__span'>Sub total: <strong>23,000</strong></span>
                    <Line/>
                    <span className='cart__span'><SubTittleCrud title='Total: '/> <strong className='cart__strong-total'>25,000</strong></span>
                    <Line/>
                    <button className='cart__button-checkout'>PAGAR <MdOutlineShoppingCartCheckout   size={23}/></button>

                </div>
            </div>

        </form>
    )
}
