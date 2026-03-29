import { axiosClient } from "../../../shared/api/axiosClient";
import { endPoints } from "../../../shared/api/endPoints";
import { CreateOrderRequestDTO, OrderResponseDTO } from "../dto/orderDto";

export const createOrder = async (
  data: CreateOrderRequestDTO
): Promise<OrderResponseDTO> => {
  const response = await axiosClient.post<OrderResponseDTO>(
    endPoints.user.order.create,
    data
  );

  return response.data;
};

export const listOrder = async (params: {
  page: number;
  status?: string;
  date?: string;
}) => {
  const response = await axiosClient.get(
    endPoints.employee.order.list(params)
  );
  return response;
};

export const updateOrder = async (id: number, status: string) =>{
  const response = await axiosClient.patch(endPoints.employee.order.updated(id, status));
  return response;
}

export const previewOrder = async (id: number) =>{
  const response = await axiosClient.get(endPoints.employee.order.preview(id));
  return response;
}