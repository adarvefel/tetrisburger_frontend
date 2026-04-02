import { useState } from "react";
import { toast } from "sonner";
import { updateOrder, createPayment } from "../../../../entities/order/api/orderApi";
import { CreatePaymentMethodDTO, OrderResponseDTO } from "../../../../entities/order/dto/orderDto";

export function useOrderActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleCreatePayment = async (data: CreatePaymentMethodDTO) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createPayment(data);
      toast.success("Método de pago registrado correctamente.");
      return response;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al registrar el pago.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = async (id: number, status: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateOrder(id, status);
      toast.success("Estado de la orden actualizado.");
      return response;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al actualizar la orden.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleCreatePayment, handleUpdateOrder };
}