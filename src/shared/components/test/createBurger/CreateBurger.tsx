import React, { useState } from 'react'
import "./createBurger.css"
import { FaCircleExclamation } from "react-icons/fa6";
import SubTittleCrud from '../../componetsCrud/subTittle/SubTittleCrud';
import InputCrud from '../../componetsCrud/fields/inputCrud/InputCrud';
import TextareaCrud from '../../componetsCrud/fields/textareaCrud/TextareaCrud';
import ImageCrud from '../../componetsCrud/fields/imageCrud/ImageCrud';
import imageBurgerNotFound from "./../../../../assets/productNotFound.png"
import CheckboxCrud from '../../componetsCrud/fields/checkboxCrud/CheckboxCrud';
import { PiHamburgerFill } from "react-icons/pi";
import Line from '../../componetsCrud/fields/line/Line';
import { FaImage } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { PiTrash } from "react-icons/pi";
import { FaCirclePlus } from "react-icons/fa6";
import { HiMiniMinusCircle } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { toast } from 'sonner';

export default function CreateBurger() {



    //Vuelta pa la mierda de cantidad

    const [quantity, setQuantity] = useState(1);

    const plusQuiantity = () =>{
        setQuantity((prev) => prev + 1);
    }

    const minusQuiantity = () =>{
        setQuantity((prev) => {
            if (prev === 1) {
                toast.error("Cantidad minima: 1");
                return 1;
            }

            return prev - 1;
        });
    }

    return (
        <form className='createBurger__form'>

            <div className="createBurger__container-image">
                <SubTittleCrud icon={<FaImage size={22} color='red' />} title='Imagen' />
                <Line />
                <ImageCrud defaultImage={imageBurgerNotFound} currentImage='null' title='Imagen de la hamburguesa' />
            </div>

            <div className="createBurger__container-data">
                <SubTittleCrud title="Informacion general" icon={<FaCircleExclamation size={22} color="red" />} />

                <Line />

                <InputCrud label='Nombre de la hamburguesa' name='name' placeholder='ej: burger super quesuda' />

                <TextareaCrud label='Descripcion' name='description' placeholder='ej: tiene mas queso que colanta' rows={4} />

                <InputCrud label='Precio final ($)' name='finalPrice' placeholder='$' />
            </div>

            <div className="createBurger__container-actions">
                <SubTittleCrud icon={<FaCheckDouble size={22} color='red' />} title='Acciones' />
                <Line />
                <div className="createBurger__container-checks">
                    <CheckboxCrud label='Destacada' name='isFavorite' checkboxLabel='Marcar como favorita' />
                    <CheckboxCrud label='Disponible' name='availability' checkboxLabel='Marcar como disponible' />
                </div>
            </div>

            <div className="createBurger__container-ingredients">
                <div className="createBurger__container-tittle">
                    <SubTittleCrud icon={<PiHamburgerFill size={22} color='red' />} title='Ingredientes' />
                    <button className='createBurger__button-add'> <IoIosAddCircleOutline size={17} color='red' />Añadir ingrediente</button>
                </div>
                <Line />
                <div className="createBurger__container-list">

                    <div className="createBurger__card-ingredient">

                        <PiDotsSixVerticalBold size={22} color='black' />
                        <span className='createBurger__span'>Queso chedar</span>
                        <div className="createBurger__container-quantity">
                            <button className='createBurger__button' type='button'><FiMinus size={17} color='black' onClick={minusQuiantity} /></button>
                            <span className='createBurger__span'>Cant: <strong>{quantity}</strong>x</span>
                            <button className='createBurger__button'  type='button'><FiPlus size={15} color='black' onClick={plusQuiantity} /></button>
                        </div>
                        <span className='createBurger__span'>Opcional <input type='checkbox' /></span>
                        <PiTrash size={17} color='black' />

                    </div>

                    <div className="createBurger__card-ingredient">

                        <PiDotsSixVerticalBold size={22} color='black' />
                        <span className='createBurger__span'>Queso chedar</span>
                        <div className="createBurger__container-quantity">
                            <button className='createBurger__button' type='button'><FiMinus size={17} color='black' onClick={minusQuiantity} /></button>
                            <span className='createBurger__span'>Cant: <strong>{quantity}</strong>x</span>
                            <button className='createBurger__button'  type='button'><FiPlus size={15} color='black' onClick={plusQuiantity} /></button>
                        </div>
                        <span className='createBurger__span'>Opcional <input type='checkbox' /></span>
                        <PiTrash size={17} color='black' />

                    </div>

                    <div className="createBurger__card-ingredient">

                        <PiDotsSixVerticalBold size={22} color='black' />
                        <span className='createBurger__span'>Queso chedar</span>
                        <div className="createBurger__container-quantity">
                            <button className='createBurger__button' type='button'><FiMinus size={17} color='black' onClick={minusQuiantity} /></button>
                            <span className='createBurger__span'>Cant: <strong>{quantity}</strong>x</span>
                            <button className='createBurger__button'  type='button'><FiPlus size={15} color='black' onClick={plusQuiantity} /></button>
                        </div>
                        <span className='createBurger__span'>Opcional <input type='checkbox' /></span>
                        <PiTrash size={17} color='black' />

                    </div>

                    <div className="createBurger__card-ingredient">

                        <PiDotsSixVerticalBold size={22} color='black' />
                        <span className='createBurger__span'>Queso chedar</span>
                        <div className="createBurger__container-quantity">
                            <button className='createBurger__button' type='button'><FiMinus size={17} color='black' onClick={minusQuiantity} /></button>
                            <span className='createBurger__span'>Cant: <strong>{quantity}</strong>x</span>
                            <button className='createBurger__button'  type='button'><FiPlus size={15} color='black' onClick={plusQuiantity} /></button>
                        </div>
                        <span className='createBurger__span'>Opcional <input type='checkbox' /></span>
                        <PiTrash size={17} color='black' />

                    </div>

                    <div className="createBurger__card-ingredient">

                        <PiDotsSixVerticalBold size={22} color='black' />
                        <span className='createBurger__span'>Queso chedar</span>
                        <div className="createBurger__container-quantity">
                            <button className='createBurger__button' type='button'><FiMinus size={17} color='black' onClick={minusQuiantity} /></button>
                            <span className='createBurger__span'>Cant: <strong>{quantity}</strong>x</span>
                            <button className='createBurger__button' type='button'><FiPlus size={15} color='black' onClick={plusQuiantity} /></button>
                        </div>
                        <span className='createBurger__span'>Opcional <input type='checkbox' /></span>
                        <PiTrash size={17} color='black' />

                    </div>

                </div>
            </div>

        </form>
    )
}
