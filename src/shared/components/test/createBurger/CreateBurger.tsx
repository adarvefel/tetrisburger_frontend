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
import IngredientsModel from '../ingredients/IngredientsModel';
import { CreateBurgerByAdminDTO, IngredientsRequestDTO2, IngredientsResponseDTO } from '../dto';
import photoNotFound from "../../../../assets/productNotFound.png"
import burgerNotFound from "../../../../assets/burgerNotFound.png"
import useCreateBurger from './useCreateBurger';
import ButtonSubmitCrud from '../../componetsCrud/buttonSubmit/ButtonSubmitCrud';

export default function CreateBurger() {

    const {loading, error, handleCreateBurger} = useCreateBurger();



    //GEstion pal model

    const [modelIngredients, setModelIngredients] = useState(false);

    const openModel = () => {
        setModelIngredients(true);
    }

    const closeModel = () => {
        setModelIngredients(false);
    }


    //lista de ingredients etc...


    const [ingredientsList, setIngredients] = useState<IngredientsRequestDTO2[]>([]);

    const addIngredient = (newIngredient: IngredientsResponseDTO) => {
        const alreadyExists = ingredientsList.some(ing => ing.idProduct === newIngredient.idProduct);

        if (alreadyExists) {
            toast.error("El producto ya esta en la lista.");
            return
        };

        setIngredients(prev => [
            ...prev,
            {
                imageUrl: newIngredient.imageUrl,
                name: newIngredient.name,
                idProduct: newIngredient.idProduct,
                quantity: 1,
                isOptional: false
            }
        ]);
    }

    const removeIngredient = (id: number) => {
        setIngredients(prev =>
            prev.filter(ing => ing.idProduct !== id)
        );
    };


    const plusQuantity = (id: number) => {
        setIngredients(prev =>
            prev.map((ingredient) => (
                ingredient.idProduct === id ? { ...ingredient, quantity: ingredient.quantity + 1 } : ingredient
            ))
        );
    }

    const minusQuantity = (id: number) => {
        setIngredients(prev =>
            prev.map((ingredient) => (
                ingredient.idProduct === id && ingredient.quantity > 1 ? { ...ingredient, quantity: ingredient.quantity - 1 }
                    : ingredient
            ))
        );
    }

    const changeIsOptional = (id: number) => {
        setIngredients(prev =>
            prev.map((ingredient) => (
                ingredient.idProduct === id ? { ...ingredient, isOptional: !ingredient.isOptional } : ingredient
            ))
        );
    }


    //LOGICA PRA EL FORMULARIO

    const [form, setForm] = useState<CreateBurgerByAdminDTO>({
        name: "",
        description: "",
        finalPrice: 0,
        ingredients: [],
        isFavorite: false,
        availability: false
    })

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value
        });

    }


    const [image, setImage] = useState<File | null>(null);


    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const body: CreateBurgerByAdminDTO = {
            ...form, ingredients: ingredientsList.map(({idProduct, quantity, isOptional})=>({
                idProduct, quantity, isOptional
            }))
        }

        const response = await handleCreateBurger({burger: body, file: image});

        if (response?.status === 201) {
            toast.success("Burger creada con exito");
            console.log(response);
            return
        }
    }



    return (
        <form className='createBurger__form' onSubmit={onSubmit}>

            {modelIngredients ? <IngredientsModel onClose={closeModel} onAddIngredient={addIngredient} /> : null}

            <div className="createBurger__container-image">
                <SubTittleCrud icon={<FaImage size={22} color='red' />} title='Imagen' />
                <Line />
                <ImageCrud defaultImage={burgerNotFound} onImageChange={(file) => setImage(file)} title='Imagen de la hamburguesa' />
            </div>

            <div className="createBurger__container-data">
                <SubTittleCrud title="Informacion general" icon={<FaCircleExclamation size={22} color="red" />} />

                <Line />

                <InputCrud label='Nombre de la hamburguesa' name='name' placeholder='ej: burger super quesuda' onChange={onInputChange} value={form.name} />

                <TextareaCrud label='Descripcion' name='description' placeholder='ej: tiene mas queso que colanta' rows={4} onChange={onInputChange} value={form.description} />

                <InputCrud label='Precio final ($)' name='finalPrice' type='number' placeholder='$' onChange={onInputChange} value={form.finalPrice} />
            </div>

            <div className="createBurger__container-actions">
                <SubTittleCrud icon={<FaCheckDouble size={22} color='red' />} title='Acciones' />
                <Line />
                <div className="createBurger__container-checks">
                    <CheckboxCrud label='Destacada' name='isFavorite' checkboxLabel='Marcar como favorita' onChange={onInputChange} checked={form.isFavorite} />
                    <CheckboxCrud label='Disponible' name='availability' checkboxLabel='Marcar como disponible' onChange={onInputChange} checked={form.availability} />
                </div>
            </div>

            <div className="createBurger__container-ingredients">
                <div className="createBurger__container-tittle">
                    <SubTittleCrud icon={<PiHamburgerFill size={22} color='red' />} title='Ingredientes' />
                    <button className='createBurger__button-add' type='button' onClick={openModel}> <IoIosAddCircleOutline size={17} color='red' />Añadir ingrediente</button>
                </div>
                <Line />
                <div className="createBurger__container-list">

                    {
                        ingredientsList.map((ingredient) => (
                            <div key={ingredient.idProduct} className="createBurger__card-ingredient">

                                <div className="createBurger__container-img">
                                    <img className='createBurger__img' src={ingredient.imageUrl ?? photoNotFound} alt="" />
                                </div>
                                <span className='createBurger__span'>{ingredient.name}</span>
                                <div className="createBurger__container-quantity">
                                    <button className='createBurger__button' type='button' onClick={() => minusQuantity(ingredient.idProduct)}><FiMinus size={17} color='black' /></button>
                                    <span className='createBurger__span'>Cant: <strong>{ingredient.quantity}</strong>x</span>
                                    <button className='createBurger__button' type='button' onClick={() => plusQuantity(ingredient.idProduct)}><FiPlus size={15} color='black' /></button>
                                </div>
                                <span className='createBurger__span'>Opcional <input type='checkbox' name='isOptional' checked={ingredient.isOptional} onChange={() => changeIsOptional(ingredient.idProduct)} /></span>
                                <button className='createBurger__button' type='button' onClick={() => removeIngredient(ingredient.idProduct)}><PiTrash size={17} color='black' /></button>

                            </div>

                        ))}



                </div>
            </div>

            <div className='createBruger__container-buttom'>
                <div className="createBurger__container-button">
                    <ButtonSubmitCrud label='Crear hamburguesa'/>
                </div>
            </div>

        </form>
    )
}
