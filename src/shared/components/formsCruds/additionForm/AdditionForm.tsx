import React, { useEffect, useState } from 'react'
import "./additionForm.css"
import SubTittleCrud from '../../componetsCrud/subTittle/SubTittleCrud'
import Line from '../../componetsCrud/fields/line/Line'
import ImageCrud from '../../componetsCrud/fields/imageCrud/ImageCrud'
import { FaImage } from "react-icons/fa6";
import photoNotFound from "../../../../assets/productNotFound.png"
import InputCrud from '../../componetsCrud/fields/inputCrud/InputCrud'
import TextareaCrud from '../../componetsCrud/fields/textareaCrud/TextareaCrud'
import { FaCircleExclamation } from "react-icons/fa6";
import TittleCrud from '../../componetsCrud/tittle/TittleCrud'
import CheckboxCrud from '../../componetsCrud/fields/checkboxCrud/CheckboxCrud'
import ButtonSubmitCrud from '../../componetsCrud/buttonSubmit/ButtonSubmitCrud'
import { useNavigate } from 'react-router-dom'
import { CreateAdditionRequest, CreateAdditionRequestWithImage, UpdateAdditionRequestDTO, UpdateAdditionRequestWithImageDTO } from '../../../../entities/addition/dto/additionDto'
import { toast } from 'sonner'
import InputNumberCrud from '../../componetsCrud/fields/inputNumberCrud/InputNumberCrud'


type FormMode = "admin-create" | "admin-update";

interface AdditionFormProps {
  mode: FormMode;
  initialData?: {
    idAddition?: number;
    name?: string;
    description?: string
    price?: number;
    available?: boolean;
    imageUrl?: string | null;
  }
  onSubmit: (data: any) => Promise<any>
}

export default function AdditionForm({ mode, initialData, onSubmit }: AdditionFormProps) {

  const [formData, setFormData] = useState({
    idAddition: initialData?.idAddition || 0,
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    available: initialData?.available || false,
    imageUrl: initialData?.imageUrl || null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        idAddition: initialData?.idAddition || 0,
        name: initialData?.name || "",
        description: initialData?.description || "",
        price: initialData?.price || "",
        available: initialData?.available || false,
        imageUrl: initialData?.imageUrl || null,
      });
    }
  }, [initialData]);

  


  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number" && value !== ""
            ? Number(value)
            : value,
    }));
  };

  let nagivation = useNavigate();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "admin-create") {


      const additionToCreate: CreateAdditionRequest = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        available: formData.available
      }

      const additionCreated: CreateAdditionRequestWithImage = {
        addition: additionToCreate,
        image: imageFile
      }

      const response = await onSubmit(additionCreated);
      if (response.status === 201) {
        toast.success("Adicion creada con éxito.");
        setTimeout(() => {
          nagivation("/admin/addition-list");
        }, 2000)
        return
      }
      return
    } else {
      const additionToUpdated: UpdateAdditionRequestDTO = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        available: formData.available
      }

      const additionUpdated: UpdateAdditionRequestWithImageDTO = {
        addition: additionToUpdated,
        file: imageFile
      }

      const response = await onSubmit(additionUpdated);
      if (response.status === 200) {
        toast.success("Adicion actualizada con éxito.");
        setTimeout(() => {
          nagivation("/admin/addition-list");
        }, 2000)
        return
      }
      return
    }
  }

  const formIsEqual =
  (initialData?.name ?? "") === formData.name &&
  (initialData?.description ?? "") === formData.description &&
  (initialData?.price ?? 0) === Number(formData.price) &&
  (initialData?.available ?? false) === formData.available &&
  (initialData?.imageUrl ?? null) === (formData.imageUrl ?? null) &&
  imageFile === null;

  return (
    <form className='additionForm__form' onSubmit={handleSubmit}>

      <TittleCrud
        tittle={mode === "admin-create" ? "Crear nueva adición" : "Actualizar adicion"}
        description="Agrega un complemento adicional que los clientes podrán incluir en sus hamburguesas, como extras, toppings o acompañamientos."
      />

      <div className="additionForm__container-image">
        <SubTittleCrud icon={<FaImage size={22} color='red' />} title='Imagen' />
        <Line />
        <ImageCrud defaultImage={formData.imageUrl ?? photoNotFound} onImageChange={(file) => setImageFile(file)} title='Imagen de la adicion' />
      </div>

      <div className="additionForm__container-data">

        <SubTittleCrud title="Informacion general" icon={<FaCircleExclamation size={22} color="red" />} />

        <Line />

        <InputCrud id='addition-form-id' label='ID adicion' name='idAddition' onChange={onInputChange} value={formData.idAddition} disabled/>

        <InputCrud id='addition-form-name' label='Nombre de la adicion' name='name' placeholder='ej: burger super quesuda' onChange={onInputChange} value={formData.name} required/>

        <TextareaCrud id='addition-form-description' label='Descripcion' name='description' rows={3} placeholder='ej: tiene mas queso que colanta' onChange={onInputChange} value={formData.description} required/>

        <InputNumberCrud id='addition-form-price' label='Precio ($)' name='price' type='number' placeholder='$' onChange={onInputChange} value={formData.price} required />

        <CheckboxCrud id='addition-form-available' label='Disponibilidad' checkboxLabel='Marcar disponibilidad' name='available' onChange={onInputChange} checked={formData.available} />
      </div>


      <ButtonSubmitCrud id='addition-form-submit' disabled={formIsEqual} label={mode === "admin-create" ? "Crear adicion" : "Actualizar adicion"} />

    </form>
  )
}
