import React, { useEffect, useState } from 'react'
import "./categoryMenuForm.css"
import TittleCrud from '../../componetsCrud/tittle/TittleCrud'
import Line from '../../componetsCrud/fields/line/Line'
import InputCrud from '../../componetsCrud/fields/inputCrud/InputCrud'
import TextareaCrud from '../../componetsCrud/fields/textareaCrud/TextareaCrud'
import ButtonSubmitCrud from '../../componetsCrud/buttonSubmit/ButtonSubmitCrud'
import { useNavigate } from 'react-router-dom'
import { CreateMenuCategoryRequestDTO, UpdateMenuCategoryRequestDTO } from '../../../../entities/categoryMenu/dto/categoryMenuDto'
import { toast } from 'sonner'

type FormMode = "admin-create" | "admin-update";

interface CategoryMenuFormProps {
    mode: FormMode;
    initialData?: {
        idMenuCategory?: number;
        menuCategoryName?: string;
        description?: string
    }
    onSubmit: (data: any) => Promise<any>
    loading?: boolean
}

export default function CategoryMenuForm({ mode, initialData, onSubmit, loading = false }: CategoryMenuFormProps) {


    const [formData, setFormData] = useState({
        idMenuCategory: initialData?.idMenuCategory ?? 0,
        menuCategoryName: initialData?.menuCategoryName ?? "",
        description: initialData?.description ?? ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                idMenuCategory: initialData?.idMenuCategory ?? 0,
                menuCategoryName: initialData?.menuCategoryName ?? "",
                description: initialData?.description ?? ""
            });
        }
    }, [initialData]);

    let nagivation = useNavigate();


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (mode === "admin-update") {

            const categoryMenuToUpdate: UpdateMenuCategoryRequestDTO = {
                menuCategoryName: formData.menuCategoryName,
                description: formData.description
            }

            const response = await onSubmit(categoryMenuToUpdate);

            if (response.status === 200) {
                toast.success("Categoria menu actualizada con exito");
                nagivation("/admin/category-menu-list");
                return

            }

            return;


        } else {
            const categoryMenuToCreate: CreateMenuCategoryRequestDTO = {
                menuCategoryName: formData.menuCategoryName,
                description: formData.description
            }

            const response = await onSubmit(categoryMenuToCreate);

            if (response.status === 201) {
                toast.success("Categoria menu creada con exito");
               nagivation("/admin/category-menu-list");
                return

            }

            return;
        }
    }


    const formIsEqual =
        (initialData?.menuCategoryName ?? "") === formData.menuCategoryName &&
        (initialData?.description ?? "") === formData.description;


    return (
        <form onSubmit={handleSubmit} className='categoryMenuForm__form'>
            <TittleCrud
                tittle={mode === "admin-create" ? "Crear Categoria Menu" : "Actualizar Categoria Menu"}
                description='Organice su menu y productos creando manera de clasificarlas'
            />
            <Line />
            <InputCrud id='categoryMenu-form-id' label='ID categoria menu' disabled name='idMenuCategory' value={formData.idMenuCategory} />
            <InputCrud id='categoryMenu-form-name' label='Nombre de la categoria menu' required name='menuCategoryName' onChange={onInputChange} value={formData.menuCategoryName} />
            <TextareaCrud id='categoryMenu-form-description' label='Descripcion' rows={6} required name='description' onChange={onInputChange} value={formData.description} />
            <ButtonSubmitCrud id='categoryMenu-form-submit' disabled={formIsEqual} label={mode === "admin-create" ? "Crear categoria menu" : "Actualizar categoria menu"} loading={loading} />
        </form>
    )
}
