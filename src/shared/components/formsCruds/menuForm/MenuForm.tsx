import React, { useEffect, useState } from 'react'
import ButtonSubmitCrud from '../../componetsCrud/buttonSubmit/ButtonSubmitCrud';
import Line from '../../componetsCrud/fields/line/Line';
import SubTittleCrud from '../../componetsCrud/subTittle/SubTittleCrud';
import CheckboxCrud from '../../componetsCrud/fields/checkboxCrud/CheckboxCrud';
import InputCrud from '../../componetsCrud/fields/inputCrud/InputCrud';
import TextareaCrud from '../../componetsCrud/fields/textareaCrud/TextareaCrud';
import ImageCrud from '../../componetsCrud/fields/imageCrud/ImageCrud';

import { PiHamburgerFill } from "react-icons/pi";
import { FaImage } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { PiTrash } from "react-icons/pi";
import { FiPlus } from "react-icons/fi"
import { FaCircleExclamation } from "react-icons/fa6";



import "./menuForm.css"
import photoNotFound from "../../../../assets/productNotFound.png"
import InputNumberCrud from '../../componetsCrud/fields/inputNumberCrud/InputNumberCrud';
import { useMenuForm } from './useMenuForm';
import ListIngredientsBurger from '../../../../features/admin/burger/ui/listIngredientsBurger/ListIngredientsBurger';
import AsyncSearchSelect from '../../componetsCrud/fields/asyncSearchSelect/AsyncSearchSelect';
import { MenuResponseDTO } from '../../../../entities/menu/dto/menuDto';

type FormMode = "admin-create" | "admin-update";

interface MenuFormProps {
    mode: FormMode;
    initialData?: MenuResponseDTO
    onSubmit: (data: any) => Promise<any>
}


export default function MenuForm({ mode, initialData, onSubmit }: MenuFormProps) {

    const {
        modelIngredients,
        openModel,
        closeModel,
        ingredientsList,
        setIngredientsList,
        addIngredient,
        removeIngredient,
        plusQuantity,
        minusQuantity,
        loadBurgers
    } = useMenuForm();

    const [image, setImage] = useState<File | null>(null);


    const handleBurgerChange = (option: any) => {
        console.log(option.value); // idBurger
    }

    const [form, setForm] = useState({
        idMenu: initialData?.idMenu ?? 0,
        name: initialData?.name ?? "",
        description: initialData?.description ?? "",
        regularPrice: initialData?.regularPrice ?? 0,
        comboPrice: initialData?.comboPrice ?? 0,
        isAvailable: initialData?.isAvailable ?? true,
        imageUrl: initialData?.imageUrl ?? null,
        idMenuCategory: initialData?.idMenuCategory ?? 0,
        items: initialData?.items ?? []
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                idMenu: initialData?.idMenu ?? 0,
                name: initialData?.name ?? "",
                description: initialData?.description ?? "",
                regularPrice: initialData?.regularPrice ?? 0,
                comboPrice: initialData?.comboPrice ?? 0,
                isAvailable: initialData?.isAvailable ?? true,
                imageUrl: initialData?.imageUrl ?? null,
                idMenuCategory: initialData?.idMenuCategory ?? 0,
                items: initialData?.items ?? []
            });

            setIngredientsList(initialData.items ?? []);

        }
    }, [initialData]);



    return (
        <form className='menuForm__form'>

            {modelIngredients ? <ListIngredientsBurger mode='menu' onClose={closeModel} onAddIngredient={addIngredient} /> : null}


            <div className="menuForm__container-image">
                <SubTittleCrud icon={<FaImage size={22} color='red' />} title='Imagen' />
                <Line />
                <ImageCrud defaultImage={photoNotFound} title='Imagen del menu' />
            </div>

            <div className="menuForm__container-data">
                <SubTittleCrud title="Informacion general" icon={<FaCircleExclamation size={22} color="red" />} />

                <Line />

                <AsyncSearchSelect
                    placeholder="Buscar hamburguesa..."
                    loadOptions={loadBurgers}
                    onChange={handleBurgerChange}
                />

                <InputCrud id='burger-form-id' label='ID hambuguresa' name='id' disabled />

                <InputCrud id='burger-form-name' label='Nombre de la hamburguesa' name='name' placeholder='ej: burger super quesuda' />

                <TextareaCrud id='burger-form-description' label='Descripcion' name='description' placeholder='ej: tiene mas queso que colanta' rows={4} />

                <InputNumberCrud id='burger-form-finalPrice' label='Precio ($)' name='finalPrice' type='number' placeholder='$' />
            </div>

            <div className="menuForm__container-actions">
                <SubTittleCrud icon={<FaCheckDouble size={22} color='red' />} title='Acciones' />
                <Line />
                <div className="menuForm__container-checks">
                    <CheckboxCrud id='burger-form-isFeatured' label='Destacada' name='isFeatured' checkboxLabel='Marcar como favorita' />
                    <CheckboxCrud id='burger-form-availability' label='Disponible' name='availability' checkboxLabel='Marcar como disponible' />
                </div>
            </div>

            <div className="menuForm__container-ingredients">
                <div className="menuForm__container-tittle">
                    <SubTittleCrud icon={<PiHamburgerFill size={22} color='red' />} title='Ingredientes' />
                    <button className='menuForm__button-add' type='button' onClick={openModel}> <IoIosAddCircleOutline size={17} color='red' />Añadir ingrediente</button>
                </div>
                <Line />
                <div className="menuForm__container-list">

                    {
                        ingredientsList.map((ingredient) => (
                            <div key={ingredient.idProduct} className="menuForm__card-ingredient">

                                <div className="menuForm__container-img">
                                    <img className='menuForm__img' src={ingredient.imageUrl ?? photoNotFound} alt="" />
                                </div>
                                <span className='menuForm__span'>{ingredient.productName}</span>
                                <div className="menuForm__container-quantity">
                                    <button className='menuForm__button' type='button' onClick={() => minusQuantity(ingredient.idProduct)}><FiMinus size={17} color='black' /></button>
                                    <span className='menuForm__span'>Cant: <strong>{ingredient.quantity}</strong>x</span>
                                    <button className='menuForm__button' type='button' onClick={() => plusQuantity(ingredient.idProduct)}><FiPlus size={15} color='black' /></button>
                                </div>
                                <button className='menuForm__button' type='button' onClick={() => removeIngredient(ingredient.idProduct)}><PiTrash size={17} color='black' /></button>

                            </div>

                        ))}



                </div>
            </div>


            <ButtonSubmitCrud id='burger-form-submit' />





        </form>
    )
}
