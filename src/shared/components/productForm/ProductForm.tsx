import React, { useEffect, useState } from "react";
import "./productForm.css";
import {
  CreateProductDto,
  UpdateProductDto,
} from "../../../entities/product/dto/productDto";
import { ErrorAlert } from "../alerts/errorAlert/ErrorAlert";
import SuccessAlert from "../alerts/successAlert/SuccessAlert";
import { useNavigate } from "react-router-dom";


type ProductFormMode = "admin-create" | "admin-update";

interface ProductFormProps {
  mode: ProductFormMode;
  initialData?: {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    available?: boolean;
    productType?: string;
  };
  onSubmit: (data: any) => Promise<any>;
}

export default function ProductForm({
  mode,
  initialData,
  onSubmit,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    id: initialData?.id ?? 0,
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    price: initialData?.price ?? 0,
    quantity: initialData?.quantity ?? 0,
    available: initialData?.available ?? false,
    productType: initialData?.productType ?? "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id ?? 0,
        name: initialData.name ?? "",
        description: initialData.description ?? "",
        price: initialData.price ?? 0,
        quantity: initialData.quantity ?? 0,
        available: initialData.available ?? false,
        productType: initialData.productType ?? "",
      });
    }
  }, [initialData]);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  let nagivation = useNavigate();

  const [alertError, setAlertError] = useState<string | null>(null);
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

  const onCloseAlertError = () => setAlertError(null);
  const onCloseAlertSuccess = () => setAlertSuccess(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name.trim() === "" || formData.description.trim() === "") {
      setAlertError("Por favor complete todos los campos obligatorios.");
      return;
    }

    if (formData.price < 0 || formData.quantity < 0) {
      setAlertError("Precio y cantidad no pueden ser negativos.");
      return;
    }

    try {
      if (mode === "admin-create") {
        const createData: CreateProductDto = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        quantity: formData.quantity,
        availability: formData.available,
        productType: formData.productType,
        ingredientType: "BASIC",
        burgerIngredient: false,
        imageUrl: "",
        productCategoryId: 1,
        supplierId: 1,
      };
      await onSubmit(createData);
      setAlertSuccess("Producto creado con éxito.");
      setTimeout(()=>{
        nagivation("/admin/product-list");
      }, 2000)
    } else {
        const updateData: UpdateProductDto = {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          price: formData.price,
          quantity: formData.quantity,
          availability: formData.available,
          productType: formData.productType,
        };

        const response = await onSubmit(updateData);
        setAlertSuccess("Producto actualizado con éxito.");
        setTimeout(()=>{
        nagivation("/admin/product-list");
      }, 2000)
      }
    } catch (error: any) {
      setAlertError(error?.response?.data?.message ||error?.message ||"Error al procesar el formulario.");
    }
  };

  return (
    <form className="productForm__form" onSubmit={handleSubmit}>
      {alertError && (
        <ErrorAlert mensaje={alertError} onClosed={onCloseAlertError} />
      )}
      {alertSuccess && (
        <SuccessAlert mensaje={alertSuccess} onClosed={onCloseAlertSuccess} />
      )}

      <div className="productForm__container-top">
        <div className="productForm__container-text">
          <h3 className="productForm__h3">
            {mode === "admin-create" ? "Crear producto" : "Actualizar producto"}
          </h3>
          <p className="productForm__p">
            Gestiona los datos básicos del producto en el panel de
            administración.
          </p>
        </div>
      </div>

      <div className="productForm__container-medium">
        <div className="productForm__container-row">
          <div className="productForm__container-input">
            <label className="productForm__label">ID producto</label>
            <input
              className="productForm__input"
              type="text"
              name="id"
              value={formData.id}
              disabled
              onChange={onInputChange}
            />
          </div>

          <div className="productForm__container-input">
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
          <div className="productForm__container-input">
            <label className="productForm__label">Precio</label>
            <input
              className="productForm__input"
              type="number"
              name="price"
              min={0}
              required
              value={formData.price}
              onChange={onInputChange}
            />
          </div>

          <div className="productForm__container-input">
            <label className="productForm__label">Cantidad en stock</label>
            <input
              className="productForm__input"
              type="number"
              name="quantity"
              min={0}
              required
              value={formData.quantity}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="productForm__container-input">
          <label className="productForm__label">Tipo de producto</label>
          <input
              className="productForm__input"
              type="text"
              name="productType"
              required
              value={formData.productType}
              onChange={onInputChange}
            />
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
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    available: e.target.checked,
                  }))
                }
              />
              <span className="productForm__checkbox-text">
                Marcar como disponible
              </span>
            </div>
          </div>
        </div>

        <div className="productForm__container-row">
          <div className="productForm__container-input productForm__container-input--full">
            <label className="productForm__label">Descripción</label>
            <textarea
              className="productForm__textarea"
              name="description"
              required
              value={formData.description}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>

      <div className="productForm__container-buttom">
        <div className="productForm__container-button-buttom">
          <button className="productForm__button-submit" type="submit">
            {mode === "admin-create" ? "Crear producto" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </form>
  );
}
