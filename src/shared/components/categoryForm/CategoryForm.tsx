import React, { useEffect, useState } from "react";
import "./categoryForm.css";
import {
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
} from "../../../entities/productCategory/dto/productCategoryDto";
import { ErrorAlert } from "../alerts/errorAlert/ErrorAlert";
import SuccessAlert from "../alerts/successAlert/SuccessAlert";
import { toast } from "sonner";

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
    available: initialData?.available ?? true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id ?? 0,
        name: initialData.name ?? "",
        description: initialData.description ?? "",
        available: initialData.available ?? true,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name.trim() === "") {
      toast.error("El nombre es obligatorio.");
      return;
    }

    try {
      if (mode === "admin-create") {
        const createData: CreateProductCategoryDto = {
          name: formData.name,
          description: formData.description,
          available: formData.available,
        };

        await onSubmit(createData);
        toast.success("Categoría creada con éxito.");

        setFormData({
          id: 0,
          name: "",
          description: "",
          available: true,
        });
      } else {
        const updateData: UpdateProductCategoryDto = {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          available: formData.available,
        };

        await onSubmit(updateData);
        toast.success("Categoría actualizada con éxito.");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error al procesar el formulario."
      );
    }
  };

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
        {mode === "admin-update" && (
          <div className="productForm__container-row">
            <div className="productForm__container-input">
              <label className="productForm__label">ID categoría</label>
              <input
                className="productForm__input"
                type="text"
                name="id"
                disabled
                value={formData.id}
                onChange={() => {}}
              />
            </div>
          </div>
        )}

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
