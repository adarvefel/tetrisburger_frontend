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
import burgerCustom from "../../../../assets/burgerCustom.png"
import InputNumberCrud from '../../componetsCrud/fields/inputNumberCrud/InputNumberCrud';
import { useNavigate } from 'react-router-dom';
import { CreateCustomBurgerRequestDTO, UpdateCustomBurgerRequestDTO } from '../../../../features/user/burgerCustom/dto/burgerCustomDto';
import useAddBurgerFavorite from '../../../../features/user/burgerCustom/hooks/useAddBurgerFavorite';
import { useCartStore } from '../../../store/useCartStore';


type FormMode = "admin-create" | "admin-update" | "user-create" | "user-update";

interface BurgerFormProps {
    mode: FormMode;
    initialData?: BurgerResponseDTO
    onSubmit: (data: any) => Promise<any>
    loading?: boolean
}

export default function BurgerCustomForm({ mode, initialData, onSubmit, loading }: BurgerFormProps) {

    //BURGER CUSTON USER
    const { handleAddBurgerFavorite } = useAddBurgerFavorite();
    const addProduct = useCartStore((state) => state.addProduct);

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
        if (ingredientsList.length === 0) {
            toast.error("La hamburguesa debe tener al menos 1 ingrediente.");
            return;
        }

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
                nagivation("/admin/burger-list");
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
                nagivation("/admin/burger-list");
                return
            }
        }

        else if (mode === "user-create") {
            const data: CreateCustomBurgerRequestDTO = {
                name: form.name,
                ingredients: ingredientsList.map(({ idProduct, quantity, isOptional }) => ({
                    idProduct, quantity, isOptional
                }))
            }

            const response = await onSubmit(data);

            if (response?.status === 201) {
                form.isFeatured && handleAddBurgerFavorite(response.data.idBurger);

                addProduct({
                    typeProduct: "BURGER",
                    idProduct: response.data.idBurger,
                    name: response.data.name,
                    price: response.data.finalPrice,
                    imageUrl: burgerCustom
                });

                nagivation("/cart-me");

                return;
            }

        }

        else {
            const data: UpdateCustomBurgerRequestDTO = {
                name: form.name,
                ingredients: ingredientsList.map(({ idProduct, quantity, isOptional }) => ({
                    idProduct, quantity, isOptional
                }))
            }

            const response = await onSubmit(data);

            if (response?.status === 200) {

                addProduct({
                    typeProduct: "BURGER",
                    idProduct: response.data.idBurger,
                    name: response.data.name,
                    price: response.data.finalPrice,
                    imageUrl: burgerCustom
                });

                nagivation("/cart-me");

                return;
            }
        }


    }


    const formIsEqual =
        (initialData?.name ?? "") === form.name &&
        (initialData?.description ?? "") === form.description &&
        (initialData?.basePrice ?? 0) === Number(form.basePrice) &&
        (initialData?.finalPrice ?? 0) === Number(form.finalPrice) &&
        (initialData?.margin ?? 0) === form.margin &&
        (initialData?.marginPercentage ?? 0) === form.marginPercentage &&
        (initialData?.sellingAtLoss ?? false) === form.sellingAtLoss &&
        (initialData?.isOnMenu ?? false) === form.isOnMenu &&
        (initialData?.isFeatured ?? false) === form.isFeatured &&
        (initialData?.availability ?? false) === form.availability &&
        (initialData?.imageUrl ?? null) === (form.imageUrl ?? null) &&
        image === null &&
        JSON.stringify(initialData?.ingredients ?? []) === JSON.stringify(ingredientsList);






    return (
        <form className='burgerCustomForm__form' onSubmit={handleSubmit}>

            {modelIngredients ? <ListIngredientsBurger onClose={closeModel} onAddIngredient={addIngredient} /> : null}

            <div className="burgerCustomForm__container-main">

                {(mode !== "user-create" && mode !== "user-update") && (
                    <div className="burgerCustomForm__container-image">
                        <SubTittleCrud
                            icon={<FaImage size={22} color='red' />}
                            title='Imagen'
                        />
                        <Line />
                        <ImageCrud
                            defaultImage={form.imageUrl ?? burgerNotFound}
                            onImageChange={(file) => setImage(file)}
                            title='Imagen de la hamburguesa'
                        />
                    </div>
                )}

                <div className="burgerCustomForm__container-data">
                    <SubTittleCrud title="Informacion general" icon={<FaCircleExclamation size={22} color="red" />} />

                    <Line />

                    {(mode !== "user-create" && mode !== "user-update") && (
                        <InputCrud
                            id='burger-form-id'
                            label='ID hambuguresa'
                            name='id'
                            value={form.idBurger}
                            disabled
                        />
                    )}

                    <InputCrud
                        id='burger-form-name'
                        label='Nombre de la hamburguesa'
                        name='name'
                        placeholder='ej: burger super quesuda'
                        onChange={onInputChange}
                        value={form.name}
                        required
                    />

                    {(mode !== "user-create" && mode !== "user-update") && (
                        <TextareaCrud
                            id='burger-form-description'
                            label='Descripcion'
                            name='description'
                            placeholder='ej: tiene mas queso que colanta'
                            rows={4}
                            onChange={onInputChange}
                            value={form.description}
                            required
                        />
                    )}

                    {(mode !== "user-create" && mode !== "user-update") && (
                        <InputNumberCrud
                            id='burger-form-finalPrice'
                            label='Precio ($)'
                            name='finalPrice'
                            type='number'
                            placeholder='$'
                            onChange={onInputChange}
                            value={form.finalPrice}
                            required
                        />
                    )}

                </div>

                {(mode !== "user-update") && (
                    <div className="burgerCustomForm__container-actions">
                        <SubTittleCrud icon={<FaCheckDouble size={22} color='red' />} title='Acciones' />
                        <Line />
                        <div className="burgerCustomForm__container-checks">
                            <CheckboxCrud
                                id='burger-form-isFeatured'
                                label='Destacada'
                                name='isFeatured'
                                checkboxLabel='Marcar como favorita'
                                onChange={onInputChange}
                                checked={form.isFeatured}
                            />

                            {(mode !== "user-create") && (
                                <CheckboxCrud
                                    id='burger-form-availability'
                                    label='Disponible'
                                    name='availability'
                                    checkboxLabel='Marcar como disponible'
                                    onChange={onInputChange}
                                    checked={form.availability}
                                />
                            )}
                        </div>
                    </div>
                )}

                <div className="burgerCustomForm__container-ingredients">
                    <div className="burgerCustomForm__container-tittle">
                        <SubTittleCrud icon={<PiHamburgerFill size={22} color='red' />} title='Ingredientes' />
                        <button
                            className='burgerCustomForm__button-add'
                            type='button'
                            onClick={openModel}
                        >
                            <IoIosAddCircleOutline size={17} color='red' />
                            Añadir ingrediente
                        </button>
                    </div>

                    <Line />

                    <div className="burgerCustomForm__container-list">

                        {ingredientsList.map((ingredient) => (
                            <div key={ingredient.idProduct} className="burgerCustomForm__card-ingredient">

                                <div className="burgerCustomForm__container-img">
                                    <img
                                        className='burgerCustomForm__img'
                                        src={ingredient.imageUrl ?? photoNotFound}
                                        alt=""
                                    />
                                </div>

                                <span className='burgerCustomForm__span'>
                                    {ingredient.productName}
                                </span>

                                <div className="burgerCustomForm__container-quantity">
                                    <button
                                        className='burgerCustomForm__button'
                                        type='button'
                                        onClick={() => minusQuantity(ingredient.idProduct)}
                                    >
                                        <FiMinus size={17} color='black' />
                                    </button>

                                    <span className='burgerCustomForm__span'>
                                        Cant: <strong>{ingredient.quantity}</strong>x
                                    </span>

                                    <button
                                        className='burgerCustomForm__button'
                                        type='button'
                                        onClick={() => plusQuantity(ingredient.idProduct)}
                                    >
                                        <FiPlus size={15} color='black' />
                                    </button>
                                </div>

                                <span className='burgerCustomForm__span'>
                                    Opcional
                                    <input
                                        type='checkbox'
                                        name='isOptional'
                                        checked={ingredient.isOptional}
                                        onChange={() => changeIsOptional(ingredient.idProduct)}
                                    />
                                </span>

                                <button
                                    className='burgerCustomForm__button'
                                    type='button'
                                    onClick={() => removeIngredient(ingredient.idProduct)}
                                >
                                    <PiTrash size={17} color='black' />
                                </button>

                            </div>
                        ))}

                    </div>
                </div>

                <ButtonSubmitCrud
                    id='burger-form-submit'
                    disabled={formIsEqual}
                    label={
                        mode == "admin-update"
                            ? "Actualizar hamburguesa"
                            : mode === "admin-create"
                                ? "Crear hamburguesa"
                                : mode === "user-create"
                                    ? "Guardar y añadir al carrito"
                                    : "Actualizar y añadir al carrito"
                    }
                    loading={loading}
                />

            </div>

            {(mode !== "user-create" && mode !== "user-update") && (
                <div className="burgerCustomForm__container-secound">
                    <div className="burgerCustomForm__container-analitic">

                        <span className='burgerCustomForm__span-2'>
                            Precio Base: <strong>${formatPrice(analytics.basePrice)}</strong>
                        </span>

                        <span className='burgerCustomForm__span-2'>
                            Precio Final: <strong>${formatPrice(Number(form.finalPrice))}</strong>
                        </span>

                        <Line />

                        <span className='burgerCustomForm__span-2'>
                            Margin:
                            <strong className={`burgerCustomForm__strong-${analytics.sellingAtLoss ? "red" : "green"}`}>
                                ${formatPrice(analytics.margin)}
                            </strong>
                        </span>

                        <span className='burgerCustomForm__span-2'>
                            % Margin:
                            <strong className={`burgerCustomForm__strong-${analytics.sellingAtLoss ? "red" : "green"}`}>
                                {analytics.marginPercentage.toFixed(2)}%
                            </strong>
                        </span>

                        <span className='burgerCustomForm__span-2'>
                            Perdida:
                            <strong className={`burgerCustomForm__strong-${analytics.sellingAtLoss ? "red" : "green"}`}>
                                {analytics.sellingAtLoss ? "Si" : "No"}
                            </strong>
                        </span>

                        <Line />

                        <span className='burgerCustomForm__span-2'>
                            Veces ordena: <strong>{form.timesOrdered}</strong>
                        </span>

                    </div>
                </div>
            )}

        </form>
    )
}
