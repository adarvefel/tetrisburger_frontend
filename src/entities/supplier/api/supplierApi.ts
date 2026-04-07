import { axiosClient } from "../../../shared/api/axiosClient";
import { endPoints } from "../../../shared/api/endPoints";
import { CreateSupplierDto, UpdateSupplierDto } from "../dto/supplierDto";

export const listSuppliers = async (numberPage: number) => {
  return await axiosClient.get(endPoints.admin.supplier.list(numberPage));
};

export const createSupplier = async (supplier: CreateSupplierDto) => {
  return await axiosClient.post(endPoints.admin.supplier.create, supplier);
};

export const findSupplierById = async (id: number) => {
  return await axiosClient.get(endPoints.admin.supplier.findById(id));
};

export const updateSupplier = async (id: number, supplier: UpdateSupplierDto) => {
  return await axiosClient.put(endPoints.admin.supplier.update(id), supplier);
};

export const deleteSupplier = async (id: number) => {
  return await axiosClient.delete(endPoints.admin.supplier.delete(id));
};
