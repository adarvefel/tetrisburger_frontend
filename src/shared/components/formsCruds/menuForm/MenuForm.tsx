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
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { PiTrash } from "react-icons/pi";
import { FiPlus } from "react-icons/fi"
import "./menuForm.css"
import { useMenuForm } from './useMenuForm';
import ListIngredientsBurger from '../../../../features/admin/burger/ui/listIngredientsBurger/ListIngredientsBurger';
import { CreateMenuRequestDTO, MenuResponseDTO, MenuItemResponseDTO, UpdateMenuRequestDTO, UpdateMenuRequestWithImageDTO, CreateMenuRequestWithImageDTO, MenuItemRequestDTO } from '../../../../entities/menu/dto/menuDto';
import { TableBody, TableHead, TableLayout, Td, Th } from '../../componetsCrud/table/TableComponents';
import ListModelBurgers from '../../../../features/admin/menu/ui/listModelBurgers/ListModelBurgers';
import { useListCategoryMenu } from '../../../../features/admin/categoryMenu/hooks/useListCategoryMenu';
import SelectCrud from '../../componetsCrud/fields/selectCrud/SelectCrud';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import photoNotFound from "../../../../assets/productNotFound.png"

type FormMode = "admin-create" | "admin-update";

interface MenuFormProps {
    mode: FormMode;
    initialData?: MenuResponseDTO
    onSubmit: (data: any) => Promise<any>
    loading?: boolean
}

export default function MenuForm({ mode, initialData, onSubmit, loading = false }: MenuFormProps) {

    const {
        modelIngredients,
        openModel,
        closeModel,
        ingredientsList,
        setIngredientsList,
        addProduct,
        addBurger,
        removeItem,
        plusQuantity,
        minusQuantity,
    } = useMenuForm();

    const { loading: loadingCategoriesMenu, categorysMenu } = useListCategoryMenu();

    const [image, setImage] = useState<File | null>(null);

    let nagivation = useNavigate();


    const [form, setForm] = useState({
        idMenu: initialData?.idMenu ?? 0,
        name: initialData?.name ?? "",
        description: initialData?.description ?? "",
        isAvailable: initialData?.isAvailable ?? true,
        imageUrl: initialData?.imageUrl ?? null,
        idMenuCategory: initialData?.menuCategory?.idMenuCategory ?? 0,
        items: initialData?.items ?? []
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                idMenu: initialData.idMenu,
                name: initialData.name,
                description: initialData.description,
                isAvailable: initialData.isAvailable,
                imageUrl: initialData.imageUrl ?? null,
                idMenuCategory: initialData.menuCategory?.idMenuCategory ?? 0,
                items: []
            });

            const mappedItems: MenuItemResponseDTO[] = (initialData.items ?? []).map(item => ({
                itemType: item.itemType,
                burger: item.burger ?? null,
                product: item.product ?? null,
                idMenuItem: item.idMenuItem ?? undefined
            }));

            setIngredientsList(mappedItems);
        }
    }, [initialData]);



    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {

        const { name, value } = e.target;

        const newValue =
            e.target instanceof HTMLInputElement && e.target.type === "checkbox"
                ? e.target.checked
                : value;

        setForm((prev) => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (ingredientsList.length === 0) {
          toast.error("El menú debe tener al menos un ítem");
         return;
       }

        // Convertir la lista de ingredientes a MenuItemRequestDTO
        const items: MenuItemRequestDTO[] = ingredientsList.map(({ itemType, burger, product }) => ({
            itemType,
            idBurger: burger?.idBurger ?? null,
            idProduct: product?.idProduct ?? null
        }));

        if (mode === "admin-create") {
            // Crear menú
            const body: CreateMenuRequestDTO = {
                ...form,
                idMenuCategory: Number(form.idMenuCategory),
                items
            };

            const response = await onSubmit({ menu: body, file: image } as CreateMenuRequestWithImageDTO);

            if (response?.status === 201) {
                toast.success("Menú creado con éxito");
                nagivation("/admin/menu-list");
            }
        } else if (mode === "admin-update" && initialData) {
            // Actualizar menú
            const body: UpdateMenuRequestDTO = {
                name: form.name,
                description: form.description,
                isAvailable: form.isAvailable,
                idMenuCategory: Number(form.idMenuCategory),
                items
            };

            const response = await onSubmit({ menu: body, file: image } as UpdateMenuRequestWithImageDTO);

            if (response?.status === 200) {
                toast.success("Menú actualizado con éxito");
                nagivation("/admin/menu-list");
            }
        }
    };
    const itemsAreEqual = (a: MenuItemResponseDTO[], b: MenuItemResponseDTO[]) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            const itemA = a[i];
            const itemB = b[i];

            if (
                itemA.itemType !== itemB.itemType ||
                (itemA.burger?.idBurger ?? null) !== (itemB.burger?.idBurger ?? null) ||
                (itemA.product?.idProduct ?? null) !== (itemB.product?.idProduct ?? null)
            ) {
                return false;
            }
        }
        return true;
    };

    const formIsEqual =
        (initialData?.name ?? "") === form.name &&
        (initialData?.description ?? "") === form.description &&
        (initialData?.isAvailable ?? true) === form.isAvailable &&
        (initialData?.menuCategory?.idMenuCategory ?? 0) === Number(form.idMenuCategory) &&
        (initialData?.imageUrl ?? null) === (form.imageUrl ?? null) &&
        image === null &&
        itemsAreEqual(initialData?.items ?? [], ingredientsList);

    return (
        <form className='menuForm__form' onSubmit={handleSubmit}>

            {modelIngredients === "ingredients" && (
                <ListIngredientsBurger
                    mode="menu"
                    onClose={closeModel}
                    onAddIngredient={addProduct}
                />
            )}

            {modelIngredients === "burgers" && (
                <ListModelBurgers
                    onClose={closeModel}
                    onAddIngredient={addBurger}
                />
            )}

            <div className="menuForm__container-image">
                <SubTittleCrud icon={<FaImage size={22} color='red' />} title='Imagen' />
                <Line />
                <ImageCrud
                    defaultImage={form.imageUrl ?? photoNotFound}
                    onImageChange={(file) => setImage(file)}
                    title='Imagen del menu'
                />
            </div>

            <div className="menuForm__container-data">
                <InputCrud id='menu-form-idMenu' label='ID Menu' name='idMenu' value={form.idMenu} onChange={onInputChange} disabled />

                <InputCrud required id='menu-form-name' label='Nombre del menu' name='name' placeholder='ej: menu infantil' value={form.name} onChange={onInputChange} />

                <TextareaCrud required id='menu-form-description' label='Descripcion' name='description' placeholder='ej: tiene mas queso que colanta' rows={4} value={form.description} onChange={onInputChange} />

                <SelectCrud
                    required
                    id='menu-form-category'
                    placeholder='Seleccione una categoria ...'
                    label='Seleccione la categoria menu'
                    name='idMenuCategory'
                    value={form.idMenuCategory}
                    onChange={onInputChange}
                    options={categorysMenu.map((cat) => ({
                        value: String(cat.idMenuCategory),
                        label: cat.menuCategoryName
                    }))}
                />

                <CheckboxCrud
                    id='menu-form-isAvailable'
                    label='Disponible'
                    name='isAvailable'
                    checkboxLabel='Marcar como disponible'
                    checked={form.isAvailable}
                    onChange={onInputChange}
                />
            </div>

            <div className="menuForm__container-ingredients">
                <div className="menuForm__container-tittle">
                    <SubTittleCrud icon={<PiHamburgerFill size={22} color='red' />} title='Hamburguesas y productos' />

                    <div className='menuForm__buttons-adds'>
                        <button
                            id='menu-form-add-product'
                            className='menuForm__button-add'
                            type='button'
                            onClick={() => openModel("ingredients")}
                        >
                            <IoIosAddCircleOutline size={17} color='red' />
                            Añadir Producto
                        </button>

                        <button
                            id='menu-form-add-burger'
                            className='menuForm__button-add'
                            type='button'
                            onClick={() => openModel("burgers")}
                        >
                            <IoIosAddCircleOutline size={17} color='red' />
                            Añadir Hamburguesa
                        </button>
                    </div>
                </div>

                <Line />

                <TableLayout className="menuForm__table">
                    <TableHead>
                        <tr>
                            <Th>Tipo producto</Th>
                            <Th>Foto</Th>
                            <Th>Nombre</Th>
                            <Th>Acciones</Th>
                        </tr>
                    </TableHead>

                    <TableBody>
                        {ingredientsList.map((ingredient, index) => (
                            <tr key={index}>

                                <Td>
                                    {ingredient.itemType === "BURGER" ? "Hamburguesa" : "Producto"}
                                </Td>

                                <Td>
                                    <div className="tableComponents__container-img">
                                        <img
                                            className="tableComponents__img"
                                            src={
                                                ingredient.product?.imageUrl ??
                                                ingredient.burger?.imageUrl ??
                                                photoNotFound
                                            }
                                            alt=""
                                        />
                                    </div>
                                </Td>

                                <Td>
                                    {ingredient.product?.name ?? ingredient.burger?.name}
                                </Td>

                                <Td>
                                    <button
                                        className="menuForm__button"
                                        type="button"
                                        onClick={() => removeItem(ingredient)}
                                    >
                                        <PiTrash size={17} />
                                    </button>
                                </Td>

                            </tr>
                        ))}
                    </TableBody>
                </TableLayout>
            </div>

            <ButtonSubmitCrud
                id='menu-form-submit'
                disabled={formIsEqual}
                loading={loading}
                label={mode === "admin-create" ? "Crear Menu" : "Actualizar Menu"}
            />

        </form>
    )
}