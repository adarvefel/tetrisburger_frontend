import React, { useState } from 'react'
import "./burgerCustomForm.css"
import ListIngredients from '../ingredients/ListIngredients';
import { IngredientsRequestDTO, } from '../ingredients/ingredientsDTO';
import { IoEyeSharp } from "react-icons/io5";
import { PiHamburgerFill } from "react-icons/pi";
import { MdLibraryBooks } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
export default function BurgerCustomForm() {

    //Funciones para el model de ingredientes

    const [modelIngredients, setModelIngredients] = useState(false);

    const openModelIngredients = () => {
        setModelIngredients(true);
    }

    const closeModelIngredients = () => {
        setModelIngredients(false);
    }

    //Funciones y mierdas para la lista de ingredientes

    const [ingredients, setIngredients] = useState<IngredientsRequestDTO[]>([])

    const addIngredient = (newIngredient: IngredientsRequestDTO) => {
        setIngredients(prev => [
            ...prev,
            {
                ...newIngredient,
                quantity: newIngredient.quantity ?? 1,
                isOptional: newIngredient.isOptional ?? false
            }
        ]);
    };

    const removeIngredient = (id: number) => {
        setIngredients(prev =>
            prev.filter(ing => ing.idProduct !== id)
        );
    };

    //FUncion para INPUT

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number
    ) => {
        const { name, value, type, checked } = e.target;

        setIngredients(prev =>
            prev.map(ing =>
                ing.idProduct === id
                    ? {
                        ...ing,
                        [name]:
                            type === "checkbox"
                                ? checked
                                : type === "number"
                                    ? Number(value)
                                    : value
                    }
                    : ing
            )
        );
    };


    return (
        <form className='burgerCustomForm__form'>

            {modelIngredients ? <ListIngredients onClose={closeModelIngredients} newIngredient={addIngredient} /> : null}

            {/* CONTAINER DE ARRIBA */}
            <div className="burgerCustomForm__container-top">

                <div className="burgerCustomForm__container-top-left">
                    <h1 className='burgerCustomForm__h1'>Create New Burger</h1>
                    <h4 className='burgerCustomForm__h4'>Design a new masterpiece for you menu.</h4>
                </div>

                <div className="burgerCustomForm__container-top-right">
                    <button className='burgerCustomForm__button'>Cancelar</button>
                    <button className='burgerCustomForm__button'>Save Bruger</button>
                </div>

            </div>

            {/* CONTAINER DE ABAJITO */}

            <div className="burgerCustomForm__container-bottom">

                {/* CONTAINER DE IZQUIERDA */}

                <div className="burgerCustomForm__container-left">

                    <div className="burgerCustomForm__container-one">
                        <div className="burgerCustomForm__container-tittle">
                            <MdLibraryBooks size={23} color='yellow' />
                            <h3 className='burgerCustomForm__h3'>Basic Details</h3>
                        </div>
                        <div className="burgerCustomForm__field">
                            <label className='burgerCustomForm__label'>Name</label>
                            <input className='burgerCustomForm__input' placeholder='ej: burger ultra chimba' />
                        </div>
                        <div className="burgerCustomForm__field">
                            <label className='burgerCustomForm__label'>Description</label>
                            <textarea className='burgerCustomForm__textarea' placeholder='ej: tiene demasiado que k rikoooo'></textarea>
                        </div>
                    </div>

                    <div className="burgerCustomForm__container-two">
                        <div className="burgerCustomForm__container-two-tittle">
                            <div className="burgerCustomForm__container-tittle">
                                <PiHamburgerFill size={23} color='yellow' />
                                <h3 className='burgerCustomForm__h3'>Burger Composition</h3>
                            </div>
                            <span className='burgerCustomForm__span'>{ingredients.length} ingredients</span>
                        </div>
                        <div className="burgerCustomForm__container-table">
                            <table className='burgerCustomForm__table'>
                                <thead className='burgerCustomForm__thead'>
                                    <tr className='burgerCustomForm__tr-thead'>
                                        <th className='burgerCustomForm__th'>Name</th>
                                        <th className='burgerCustomForm__th'>Cantidad</th>
                                        <th className='burgerCustomForm__th'>Optional</th>
                                    </tr>
                                </thead>
                                <tbody className='burgerCustomForm__tbody'>
                                    {
                                        ingredients.map((ingredient) => (
                                            <tr key={ingredient.idProduct} className='burgerCustomForm__tr'>
                                                <td className='burgerCustomForm__td'>{ingredient.name}</td>
                                                <td className='burgerCustomForm__td'>
                                                    <input className='burgerCustomForm__input-number' type="number" name="quantity" min={1} value={ingredient.quantity} onChange={(e) => onInputChange(e, ingredient.idProduct)} />
                                                </td>
                                                <td className='burgerCustomForm__td'>
                                                    <input className='burgerCustomForm__input-checkbox' name='isOptional' type="checkbox" checked={ingredient.isOptional} onChange={(e) => onInputChange(e, ingredient.idProduct)} /></td>
                                                <td className='burgerCustomForm__td'><button className='burgerCustomForm__button-delete' onClick={()=>removeIngredient(ingredient.idProduct)}><FaTrash size={12} /></button></td>

                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <button className='burgerCustomForm__button-add' type='button' onClick={openModelIngredients}>Add ingredient</button>
                    </div>
                </div>

                {/* CONTAINER DE DERECHA */}

                <div className="burgerCustomForm__container-right">
                    <div className="burgerCustomForm__container-tittle">
                        <IoEyeSharp size={23} color='yellow' />
                        <h3 className='burgerCustomForm__h3'>Preview</h3>

                    </div>

                </div>

            </div>

        </form>
    )
}
