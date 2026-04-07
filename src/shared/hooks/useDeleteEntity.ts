import { useState } from "react";
import { toast } from "sonner";

export function useDeleteEntity<TId = number>(
  deleteFn: (id: TId) => Promise<any>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id: TId) => {
    try {
      setLoading(true);
      setError(null);
      return await deleteFn(id);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al eliminar");
      const msg = err.response?.data?.message || "Errror inesperado al eliminar."
      toast.error(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, remove };
}
