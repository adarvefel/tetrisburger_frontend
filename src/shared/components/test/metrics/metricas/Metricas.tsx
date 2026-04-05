import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import "./metricas.css";
import { analyticsClient } from "../../../../api/analyticsClient";
import { toast } from "sonner";
import ButtonFilter from "../../../buttonFIlter/ButtonFIlter";
import ButtonReset from "../../../buttonReset/ButtonReset";
import LoadingSpinner from "../../../loadings/loadingSpinner/LoadingSpinner";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

export default function Metricas() {

  // 📊 Interfaces
  interface MetricasResponse {
    total_ventas: number;
    total_pedidos: number;
    ticket_promedio: number;
    pedidos_por_estado: Record<EstadoPedido, EstadoData>;
    ingresos_por_metodo_pago: Record<string, MetodoPagoData>;
    periodo: Periodo;
  }

  interface EstadoData {
    cantidad: number;
    total_monto: number;
  }

  interface MetodoPagoData {
    transacciones: number;
    total_recaudado: number;
  }

  interface Periodo {
    fecha_inicio: string;
    fecha_fin: string;
  }

  type EstadoPedido =
    | "ACCEPTED"
    | "CANCELLED_BY_EMPLOYEE"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "PENDING";

  // 🧠 State
  const [data, setData] = useState<MetricasResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔎 filtros
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // 🔥 Fetch
  const fetchData = async () => {
    try {
      setLoading(true);

      const params: any = {};
      if (fechaInicio) params.fecha_inicio = fechaInicio;
      if (fechaFin) params.fecha_fin = fechaFin;

      const response = await analyticsClient.get<MetricasResponse>(
        "/reports/metricas",
        { params }
      );

      setData(response.data);

    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al traer métricas";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Reset
  const resetFilters = () => {
    setFechaInicio("");
    setFechaFin("");

    setTimeout(() => {
      fetchData();
    }, 0);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const COLORS = ["#43a047", "#E53935", "#fb8c00", "#1e88e5", "#8e24aa"];

  // ⏳ Loading
  if (loading) {
    return <LoadingSpinner/>
  }

  // ❌ Error
  if (!data) {
    return <p style={{ padding: "20px" }}>Error cargando datos</p>;
  }

  // 🎯 helpers
  const formatEstado = (estado: string) => {
    switch (estado) {
      case "ACCEPTED": return "Aceptado";
      case "PENDING": return "Pendiente";
      case "CANCELLED_BY_EMPLOYEE": return "Cancelado";
      case "IN_PROGRESS": return "En progeso";
      case "COMPLETED": return "Completado";
      default: return estado;
    }
  };

  const formatPago = (metodo: string) => {
    switch (metodo) {
      case "CASH": return "Efectivo";
      case "CARD": return "Tarjeta";
      case "TRANSFER": return "Transferencia";
      default: return metodo;
    }
  };

  // 📊 Transformación: estados
  const estadosChart = Object.entries(data.pedidos_por_estado).map(
    ([estado, values]) => ({
      estado: formatEstado(estado),
      cantidad: values.cantidad
    })
  );

  // 📊 Transformación: pagos
  const pagosChart = Object.entries(data.ingresos_por_metodo_pago).map(
    ([metodo, values]) => ({
      metodo: formatPago(metodo),
      total: values.total_recaudado
    })
  );

  return (
    <div className="dashboard">

      <h2><FaMoneyBillTrendUp color="#E53935"/> Métricas generales</h2>

      {/* 🔎 FILTROS */}
      <div className="filters">

        <div>
          <label>Fecha inicio</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>

        <div>
          <label>Fecha fin</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>

        <ButtonFilter onClick={fetchData} />

        <ButtonReset onClick={resetFilters} />

      </div>

      {/* 📅 PERIODO */}
      <p className="periodo">
        {data.periodo.fecha_inicio} → {data.periodo.fecha_fin}
      </p>

      {/* 📊 CARDS */}
      <div className="cards">

        <div className="card">
          <h4>Total ventas</h4>
          <p>${data.total_ventas.toLocaleString()}</p>
        </div>

        <div className="card">
          <h4>Total pedidos</h4>
          <p>{data.total_pedidos}</p>
        </div>

        <div className="card">
          <h4>Ticket promedio</h4>
          <p>${data.ticket_promedio.toLocaleString()}</p>
        </div>

      </div>

      {/* 📊 GRÁFICAS */}
      <div className="charts">

        {/* 📦 Pedidos por estado */}
        <div className="chart-container">
          <h3>Pedidos por estado</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={estadosChart}
                dataKey="cantidad"
                nameKey="estado"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {estadosChart.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 💰 Ingresos por método */}
        <div className="chart-container">
          <h3>Ingresos por método de pago</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pagosChart}
                dataKey="total"
                nameKey="metodo"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) =>
                  `${name}: ${new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0
                  }).format(value)}`
                }
              >
                {pagosChart.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value: any) =>
                  new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0
                  }).format(value)
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}