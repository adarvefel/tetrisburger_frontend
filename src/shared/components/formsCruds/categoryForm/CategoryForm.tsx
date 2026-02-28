import React, { useEffect, useState } from "react";
import "./categoryForm.css";
import {
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
} from "../../../../entities/productCategory/dto/productCategoryDto";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type CategoryFormMode = "admin-create" | "admin-update";

interface CategoryFormProps {
  mode: CategoryFormMode;
  initialData?: {
    id?: number;
    name?: string;
    description?: string;
    available?: boolean;
  };
  onSubmit: (data: any) => Promise<any>;
}

export default function CategoryForm({
  mode,
  initialData,
  onSubmit,
}: CategoryFormProps) {

  const [formData, setFormData] = useState({
    id: initialData?.id ?? 0,
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    available: initialData?.available ?? false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id ?? 0,
        name: initialData.name ?? "",
        description: initialData.description ?? "",
        available: initialData.available ?? false,
      });
    }
  }, [initialData]);



  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const navegator = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name.trim() === "") {
      toast.error("El nombre es obligatorio.");
      return;
    }


    if (mode === "admin-create") {
      const createData: CreateProductCategoryDto = {
        name: formData.name,
        description: formData.description,
        available: formData.available,
      };

      const response = await onSubmit(createData);

      if (response.data.id) {
        toast.success("Categoría creada con éxito.");
        setTimeout(() => {
          navegator("/admin/category-list");
        }, 2000)
      }

      return
    }

    const updateData: UpdateProductCategoryDto = {
      name: formData.name,
      description: formData.description,
      available: formData.available,
    };

    const response = await onSubmit(updateData);

    if (response.data.id) {
      toast.success("Categoría actualizada con éxito.");
      setTimeout(() => {
        navegator("/admin/category-list");
      }, 2000)
    }

  }

  return (
    <form className="productForm__form" onSubmit={handleSubmit}>


      <div className="productForm__container-top">
        <div className="productForm__container-text">
          <h3 className="productForm__h3">
            {mode === "admin-create" ? "Crear categoría" : "Actualizar categoría"}
          </h3>
          <p className="productForm__p">
            Gestiona las categorías de productos del sistema.
          </p>
        </div>
      </div>

      <div className="productForm__container-medium">
          <div className="productForm__container-row">
            <div className="productForm__container-input">
              <label className="productForm__label">ID categoría</label>
              <input
                className="productForm__input"
                type="text"
                name="id"
                disabled
                value={formData.id}
                onChange={() => { }}
              />
            </div>
          </div>

        <div className="productForm__container-row">
          <div className="productForm__container-input productForm__container-input--full">
            <label className="productForm__label">Nombre</label>
            <input
              className="productForm__input"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="productForm__container-row">
          <div className="productForm__container-input productForm__container-input--full">
            <label className="productForm__label">Descripción</label>
            <textarea
              className="productForm__textarea"
              name="description"
              value={formData.description}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="productForm__container-row">
          <div className="productForm__container-input">
            <label className="productForm__label">Disponible</label>
            <div className="productForm__container-checkbox">
              <input
                className="productForm__checkbox"
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    available: e.target.checked,
                  }))
                }
              />
              <span className="productForm__checkbox-text">
                Marcar categoría como disponible
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="productForm__container-buttom">
        <div className="productForm__container-button-buttom">
          <button className="productForm__button-submit" type="submit">
            {mode === "admin-create" ? "Crear categoría" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </form>
  );
}
