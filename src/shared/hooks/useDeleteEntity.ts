import { useState } from "react";

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
      setError(err.message || "Error al eliminar");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, remove };
}
