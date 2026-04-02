import { useState } from "react";
import { toast } from "sonner";
import { createOrder } from "../../../../entities/order/api/orderApi";
import { CreateOrderRequestDTO } from "../../../../entities/order/dto/orderDto";

export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleOrderCreate = async (data: CreateOrderRequestDTO) => {
    try {
      setLoading(true);
      setError(null);

      const response = await createOrder(data);
      return response;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al intentar crear un nuevo producto";

      setError(msg);
      toast.error(msg)
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleOrderCreate };
}
