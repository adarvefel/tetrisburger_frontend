import { axiosClient } from "../../../shared/api/axiosClient";
import { endPoints } from "../../../shared/api/endPoints";
import {CreateProductCategoryDto,UpdateProductCategoryDto} from "../dto/productCategoryDto";

export const listProductCategories = async (numberPage: number) => {
  const response = await axiosClient.get(
    endPoints.admin.productCategory.list(numberPage)
  );
  return response;
};

export const createProductCategory = async (
  category: CreateProductCategoryDto
) => {
  const response = await axiosClient.post(
    endPoints.admin.productCategory.create,
    category
  );
  return response;
};

export const findProductCategoryById = async (id: number) => {
  const response = await axiosClient.get(
    endPoints.admin.productCategory.findById(id)
  );
  return response;
};

export const updateProductCategory = async (
  id: number,
  category: UpdateProductCategoryDto
) => {
  const response = await axiosClient.put(
    endPoints.admin.productCategory.update(id),
    category
  );
  return response;
};

export const deleteProductCategory = async (id: number) => {
  const response = await axiosClient.delete(
    endPoints.admin.productCategory.delete(id)
  );
  return response;
};
