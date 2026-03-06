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
import { BurgerResponseDTO, BurgerUpdateRequestDTO, CreateBurgerByAdminDTO } from '../../../../entities/burger/dto/burgerDto';
import { toast } from 'sonner';
import useCreateBurger from '../../../../features/admin/burger/hooks/useCreateBurger';
import InputNumberCrud from '../../componetsCrud/fields/inputNumberCrud/InputNumberCrud';
import { useNavigate } from 'react-router-dom';


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
                imageUrl: initialData?.imageUrl ?? null,
                timesOrdered: initialData?.timesOrdered ?? 0,
                ingredients: initialData?.ingredients ?? [],
            });

            setIngredientsList(initialData.ingredients ?? []);

        }
    }, [initialData]);



    let nagivation = useNavigate();

    const [analytics, setAnalytics] = useState({
        basePrice: 0,
        margin: 0,
        marginPercentage: 0,
        sellingAtLoss: false
    });


    useEffect(() => {

        const basePrice = ingredientsList.reduce((total, ingredient) => {
            const price = ingredient.priceAtTime ?? 0;
            return total + (price * ingredient.quantity);
        }, 0);

        const finalPrice = Number(form.finalPrice) || 0;

        const margin = finalPrice - basePrice;

        const marginPercentage =
            basePrice > 0 ? (margin / basePrice) * 100 : 0;

        const sellingAtLoss = margin < 0;

        setAnalytics({
            basePrice,
            margin,
            marginPercentage,
            sellingAtLoss
        });

    }, [ingredientsList, form.finalPrice]);

    const formatPrice = (value: number) => value.toLocaleString("es-CO");















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

        if (mode === "admin-create") {
            const body: CreateBurgerByAdminDTO = {
                ...form,
                finalPrice: Number(form.finalPrice),
                ingredients: ingredientsList.map(({ idProduct, quantity, isOptional }) => ({
                    idProduct, quantity, isOptional
                }))
            }

            const response = await onSubmit({ burger: body, file: image });

            if (response?.status === 201) {
                toast.success("Burger creada con exito");
                setTimeout(() => {
                    nagivation("/admin/burger-list");
                }, 2000)
                return
            }
        }

        else if (mode === "admin-update") {
            const body: BurgerUpdateRequestDTO = {
                ...form,
                finalPrice: Number(form.finalPrice),
                ingredients: ingredientsList.map(({ idProduct, quantity, isOptional }) => ({
                    idProduct, quantity, isOptional
                }))
            }

            const response = await onSubmit({ burger: body, file: image });

            if (response?.status === 200) {
                toast.success("Burger actualizada con exito");
                setTimeout(() => {
                    nagivation("/admin/burger-list");
                }, 2000)
                return
            }
        }


    }



    return (
        <form className='burgerCustomForm__form' onSubmit={handleSubmit}>

            {modelIngredients ? <ListIngredientsBurger onClose={closeModel} onAddIngredient={addIngredient} /> : null}

            <div className="burgerCustomForm__container-main">
                <div className="burgerCustomForm__container-image">
                    <SubTittleCrud icon={<FaImage size={22} color='red' />} title='Imagen' />
                    <Line />
                    <ImageCrud defaultImage={form.imageUrl ?? burgerNotFound} onImageChange={(file) => setImage(file)} title='Imagen de la hamburguesa' />
                </div>

                <div className="burgerCustomForm__container-data">
                    <SubTittleCrud title="Informacion general" icon={<FaCircleExclamation size={22} color="red" />} />

                    <Line />

                    <InputCrud id='burger-form-id' label='ID hambuguresa' name='id' value={form.idBurger} disabled />

                    <InputCrud id='burger-form-name' label='Nombre de la hamburguesa' name='name' placeholder='ej: burger super quesuda' onChange={onInputChange} value={form.name} />

                    <TextareaCrud id='burger-form-description' label='Descripcion' name='description' placeholder='ej: tiene mas queso que colanta' rows={4} onChange={onInputChange} value={form.description} />

                    <InputNumberCrud id='burger-form-finalPrice' label='Precio ($)' name='finalPrice' type='number' placeholder='$' onChange={onInputChange} value={form.finalPrice} />
                </div>

                <div className="burgerCustomForm__container-actions">
                    <SubTittleCrud icon={<FaCheckDouble size={22} color='red' />} title='Acciones' />
                    <Line />
                    <div className="burgerCustomForm__container-checks">
                        <CheckboxCrud id='burger-form-isFeatured' label='Destacada' name='isFeatured' checkboxLabel='Marcar como favorita' onChange={onInputChange} checked={form.isFeatured} />
                        <CheckboxCrud id='burger-form-availability' label='Disponible' name='availability' checkboxLabel='Marcar como disponible' onChange={onInputChange} checked={form.availability} />
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
                        <ButtonSubmitCrud id='burger-form-submit' label='Crear hamburguesa' />
                    </div>
                </div>
            </div>

            <div className="burgerCustomForm__container-secound">
                <div className="burgerCustomForm__container-analitic">
                    <span className='burgerCustomForm__span-2'>Precio Base: <strong>${formatPrice(analytics.basePrice)}</strong></span>
                    <span className='burgerCustomForm__span-2'>Precio Final: <strong>${formatPrice(Number(form.finalPrice))}</strong></span>
                    <Line />
                    <span className='burgerCustomForm__span-2'>Margin: <strong>${formatPrice(analytics.margin)}</strong></span>
                    <span className='burgerCustomForm__span-2'>% Margin: <strong>{analytics.marginPercentage.toFixed(2)}%</strong></span>
                    <span className='burgerCustomForm__span-2'>Perdida: <strong>{analytics.sellingAtLoss ? "Si" : "No"}</strong></span>
                    <Line />
                    <span className='burgerCustomForm__span-2'>Veces ordena: <strong>{form.timesOrdered}</strong></span>
                </div>
            </div>

        </form>
    )
}
