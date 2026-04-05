import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";

import "./debugTablas.css";
import { analyticsClient } from "../../../../api/analyticsClient";
import { toast } from "sonner";
import LoadingSpinner from "../../../loadings/loadingSpinner/LoadingSpinner";
import { FaClipboardList } from "react-icons/fa6";

export default function DebugTablas() {

  const [data, setData] = useState<Record<string, number | string> | null>(null);
  const [loading, setLoading] = useState(false);

  // 🎨 Paleta de colores
  const COLORS = [
    "#ff6b6b",
    "#4ecdc4",
    "#ffa502",
    "#3742fa",
    "#2ed573",
    "#eccc68"
  ];

  // 🔥 Fetch
  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await analyticsClient.get(
        "/reports/debug/tablas"
      );

      setData(response.data);

    } catch (err: any) {
      const msg = err.response?.data?.message || "Error en diagnóstico";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ⏳ Loading
  if (loading) {
    return <LoadingSpinner />
  }

  // ❌ Error
  if (!data) {
    return <p style={{ padding: "20px" }}>Error cargando diagnóstico</p>;
  }

  // 🎯 helpers
  const formatName = (name: string) => {
    switch (name) {
      case "order": return "Pedidos";
      case "order_item": return "Items Pedido";
      case "payment": return "Pagos";
      case "user": return "Usuarios";
      case "product": return "Productos";
      case "burger": return "Hamburguesas";
      case "user_eliminados": return "Usuarios elimiandos";
      case "product_eliminados": return "Productos eliminados";
      default: return name;
    }
  };

  // 📊 Datos
  const chartData = Object.entries(data)
    .filter(([_, value]) => typeof value === "number")
    .map(([key, value]) => ({
      tabla: formatName(key),
      cantidad: value as number
    }))
    .sort((a, b) => b.cantidad - a.cantidad);

  return (
    <div className="dashboard">

      <h2><FaClipboardList color="#E53935"/> Diagnóstico del sistema</h2>

      {/* 📊 CARDS */}
      <div className="cards">

        {Object.entries(data).map(([tabla, value]) => (
          <div className="card" key={tabla}>

            <h4>{formatName(tabla)}</h4>

            {typeof value === "number" ? (
              <p>{value}</p>
            ) : (
              <p style={{ color: "red" }}>⚠️ Error</p>
            )}

          </div>
        ))}

      </div>

      {/* 📊 GRÁFICA */}
      <div className="chart-container">
        <h3>Registros por tabla</h3>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 100, bottom: 10 }} // 👈 clave para labels largos
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis type="number" />

            <YAxis
              dataKey="tabla"
              type="category"
              width={120} // 👈 evita que se corten los nombres
            />

            <Tooltip
              formatter={(value: any) => `${value} registros`}
            />

            <Bar dataKey="cantidad" radius={[0, 10, 10, 0]}>
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}