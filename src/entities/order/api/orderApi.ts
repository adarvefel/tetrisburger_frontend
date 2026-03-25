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

export const listOrder = async (numberPage: number) =>{
  const response = await axiosClient.get(endPoints.admin.order.list(numberPage));
    return response;
}