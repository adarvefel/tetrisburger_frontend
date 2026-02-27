import React, { useState, useEffect } from "react";
import "./supplierForm.css";
import {
  CreateSupplierDto,
  UpdateSupplierDto,
} from "../../../entities/supplier/dto/supplierDto";
import { ErrorAlert } from "../alerts/errorAlert/ErrorAlert";
import SuccessAlert from "../alerts/successAlert/SuccessAlert";
import { toast } from "sonner";

type SupplierFormMode = "admin-create" | "admin-update";

interface SupplierFormProps {
  mode: SupplierFormMode;
  initialData?: {
    id?: number;
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
  onSubmit: (data: any) => Promise<any>;
}

export default function SupplierForm({
  mode,
  initialData,
  onSubmit,
}: SupplierFormProps) {
  const [formData, setFormData] = useState({
    id: initialData?.id ?? 0,
    name: initialData?.name ?? "",
    phone: initialData?.phone ?? "",
    email: initialData?.email ?? "",
    address: initialData?.address ?? "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id ?? 0,
        name: initialData.name ?? "",
        phone: initialData.phone ?? "",
        email: initialData.email ?? "",
        address: initialData.address ?? "",
      });
    }
  }, [initialData]);

  

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name.trim() === "" || formData.email.trim() === "") {
      toast.error("Nombre y email son obligatorios.");
      return;
    }

    try {
      if (mode === "admin-create") {
        const createData: CreateSupplierDto = {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
        };

        await onSubmit(createData);
        toast.success("Proveedor creado con éxito.");
        
      } else {
        const updateData: UpdateSupplierDto = {
          id: formData.id,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
        };

        await onSubmit(updateData);
        toast.success("Proveedor actualizado con éxito.");
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
            {mode === "admin-create"
              ? "Crear proveedor"
              : "Actualizar proveedor"}
          </h3>
          <p className="productForm__p">
            Gestiona los datos del proveedor en el panel de administración.
          </p>
        </div>
      </div>

      <div className="productForm__container-medium">
        {mode === "admin-update" && (
          <div className="productForm__container-row">
            <div className="productForm__container-input">
              <label className="productForm__label">ID proveedor</label>
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

          <div className="productForm__container-input">
            <label className="productForm__label">Teléfono</label>
            <input
              className="productForm__input"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="productForm__container-row">
          <div className="productForm__container-input">
            <label className="productForm__label">Correo</label>
            <input
              className="productForm__input"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={onInputChange}
            />
          </div>

          <div className="productForm__container-input">
            <label className="productForm__label">Dirección</label>
            <input
              className="productForm__input"
              type="text"
              name="address"
              value={formData.address}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>

      <div className="productForm__container-buttom">
        <div className="productForm__container-button-buttom">
          <button className="productForm__button-submit" type="submit">
            {mode === "admin-create"
              ? "Crear proveedor"
              : "Guardar cambios"}
          </button>
        </div>
      </div>
    </form>
  );
}

