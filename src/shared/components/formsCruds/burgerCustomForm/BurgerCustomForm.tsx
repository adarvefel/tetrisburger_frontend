import React, { useEffect, useState } from 'react'
import "./burgerCustomForm.css"
import { useBurgerCustomForm } from './useBurgerCustomForm';
import ButtonSubmitCrud from '../../componetsCrud/buttonSubmit/ButtonSubmitCrud';
import Line from '../../componetsCrud/fields/line/Line';
import SubTittleCrud from '../../componetsCrud/subTittle/SubTittleCrud';
import CheckboxCrud from '../../componetsCrud/fields/checkboxCrud/CheckboxCrud';
import InputCrud from '../../componetsCrud/fields/inputCrud/InputCrud';
import TextareaCrud from '../../componetsCrud/fields/textareaCrud/TextareaCrud';
import ImageCrud from '../../componetsCrud/fields/imageCrud/ImageCrud';
import ListIngredientsBurger from '../../../../features/admin/burger/ui/listIngredientsBurger/ListIngredientsBurger';
import burgerNotFound from "../../../../assets/burgerNotFound.png";
import { PiHamburgerFill } from "react-icons/pi";
import { FaImage } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { PiTrash } from "react-icons/pi";
import { FiPlus } from "react-icons/fi"
import { FaCircleExclamation } from "react-icons/fa6";
import photoNotFound from "../../../../assets/productNotFound.png"
import { BurgerResponseDTO, CreateBurgerByAdminDTO } from '../../../../entities/burger/dto/burgerDto';
import { toast } from 'sonner';
import useCreateBurger from '../../../../features/admin/burger/hooks/useCreateBurger';
import InputNumberCrud from '../../componetsCrud/fields/inputNumberCrud/InputNumberCrud';


type FormMode = "admin-create" | "admin-update";

interface BurgerFormProps {
    mode: FormMode;
    initialData?: BurgerResponseDTO
    onSubmit: (data: any) => Promise<any>
}

export default function BurgerCustomForm({ mode, initialData, onSubmit }: BurgerFormProps) {

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
        changeIsOptional
    } = useBurgerCustomForm();

    const { handleCreateBurger } = useCreateBurger();

    const [image, setImage] = useState<File | null>(null);

    const [form, setForm] = useState({
        idBurger: initialData?.idBurger ?? 0,
        name: initialData?.name ?? "",
        description: initialData?.description ?? "",
        basePrice: initialData?.basePrice ?? 0,
        finalPrice: initialData?.finalPrice ?? "",
        margin: initialData?.margin ?? 0,
        marginPercentage: initialData?.marginPercentage ?? 0,
        sellingAtLoss: initialData?.sellingAtLoss ?? false,
        isOnMenu: initialData?.isOnMenu ?? false,
        isFeatured: initialData?.isFeatured ?? false,
        availability: initialData?.availability ?? false,
        imageUrl: initialData?.imageUrl ?? null,
        timesOrdered: initialData?.timesOrdered ?? 0,
        ingredients: initialData?.ingredients ?? [],
    });


    useEffect(() => {
        if (initialData) {
            setForm({
                idBurger: initialData?.idBurger ?? 0,
                name: initialData?.name ?? "",
                description: initialData?.description ?? "",
                basePrice: initialData?.basePrice ?? 0,
                finalPrice: initialData?.finalPrice ?? "",
                margin: initialData?.margin ?? 0,
                marginPercentage: initialData?.marginPercentage ?? 0,
                sellingAtLoss: initialData?.sellingAtLoss ?? false,
                isOnMenu: initialData?.isOnMenu ?? false,
                isFeatured: initialData?.isFeatured ?? false,
                availability: initialData?.availability ?? false,
                imageUrl: initialData?.imageUrl ?? "",
                timesOrdered: initialData?.timesOrdered ?? 0,
                ingredients: initialData?.ingredients ?? [],
            });

            setIngredientsList(initialData.ingredients ?? []);
            
        }
    }, [initialData]);













    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body: CreateBurgerByAdminDTO = {
            ...form,
            finalPrice: Number(form.finalPrice),
            ingredients: ingredientsList.map(({ idProduct, quantity, isOptional }) => ({
                idProduct, quantity, isOptional
            }))
        }

        const response = await handleCreateBurger({ burger: body, file: image });

        if (response?.status === 201) {
            toast.success("Burger creada con exito");
            return
        }
    }



    return (
        <form className='burgerCustomForm__form' onSubmit={handleSubmit}>

            {modelIngredients ? <ListIngredientsBurger onClose={closeModel} onAddIngredient={addIngredient} /> : null}

            <div className="burgerCustomForm__container-image">
                <SubTittleCrud icon={<FaImage size={22} color='red' />} title='Imagen' />
                <Line />
                <ImageCrud defaultImage={form.imageUrl ?? photoNotFound} onImageChange={(file) => setImage(file)} title='Imagen de la hamburguesa' />
            </div>

            <div className="burgerCustomForm__container-data">
                <SubTittleCrud title="Informacion general" icon={<FaCircleExclamation size={22} color="red" />} />

                <Line />

                <InputCrud label='Nombre de la hamburguesa' name='name' placeholder='ej: burger super quesuda' onChange={onInputChange} value={form.name} />

                <TextareaCrud label='Descripcion' name='description' placeholder='ej: tiene mas queso que colanta' rows={4} onChange={onInputChange} value={form.description} />

                <InputNumberCrud label='Precio ($)' name='finalPrice' type='number' placeholder='$' onChange={onInputChange} value={form.finalPrice} />
            </div>

            <div className="burgerCustomForm__container-actions">
                <SubTittleCrud icon={<FaCheckDouble size={22} color='red' />} title='Acciones' />
                <Line />
                <div className="burgerCustomForm__container-checks">
                    <CheckboxCrud label='Destacada' name='isFeatured' checkboxLabel='Marcar como favorita' onChange={onInputChange} checked={form.isFeatured} />
                    <CheckboxCrud label='Disponible' name='availability' checkboxLabel='Marcar como disponible' onChange={onInputChange} checked={form.availability} />
                </div>
            </div>

            <div className="burgerCustomForm__container-ingredients">
                <div className="burgerCustomForm__container-tittle">
                    <SubTittleCrud icon={<PiHamburgerFill size={22} color='red' />} title='Ingredientes' />
                    <button className='burgerCustomForm__button-add' type='button' onClick={openModel}> <IoIosAddCircleOutline size={17} color='red' />Añadir ingrediente</button>
                </div>
                <Line />
                <div className="burgerCustomForm__container-list">

                    {
                        ingredientsList.map((ingredient) => (
                            <div key={ingredient.idProduct} className="burgerCustomForm__card-ingredient">

                                <div className="burgerCustomForm__container-img">
                                    <img className='burgerCustomForm__img' src={ingredient.imageUrl ?? photoNotFound} alt="" />
                                </div>
                                <span className='burgerCustomForm__span'>{ingredient.productName}</span>
                                <div className="burgerCustomForm__container-quantity">
                                    <button className='burgerCustomForm__button' type='button' onClick={() => minusQuantity(ingredient.idProduct)}><FiMinus size={17} color='black' /></button>
                                    <span className='burgerCustomForm__span'>Cant: <strong>{ingredient.quantity}</strong>x</span>
                                    <button className='burgerCustomForm__button' type='button' onClick={() => plusQuantity(ingredient.idProduct)}><FiPlus size={15} color='black' /></button>
                                </div>
                                <span className='burgerCustomForm__span'>Opcional <input type='checkbox' name='isOptional' checked={ingredient.isOptional} onChange={() => changeIsOptional(ingredient.idProduct)} /></span>
                                <button className='burgerCustomForm__button' type='button' onClick={() => removeIngredient(ingredient.idProduct)}><PiTrash size={17} color='black' /></button>

                            </div>

                        ))}



                </div>
            </div>

            <div className='burgerCustomForm__container-buttom'>
                <div className="burgerCustomForm__container-button">
                    <ButtonSubmitCrud label='Crear hamburguesa' />
                </div>
            </div>

        </form>
    )
}
