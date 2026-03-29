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

import "./pedidosTest.css";
import { analyticsClient } from "../../../../api/analyticsClient";
import { toast } from "sonner";
import ButtonDownload from "../../../buttonDownload/ButtonDownload";
import ButtonFilter from "../../../buttonFIlter/ButtonFIlter";
import ButtonReset from "../../../buttonReset/ButtonReset";
import LoadingSpinner from "../../../loadings/loadingSpinner/LoadingSpinner";
import { MdDeliveryDining } from "react-icons/md";
import { TableBody, TableHead, TableLayout, Td, Th } from "../../../componetsCrud/table/TableComponents";

export default function PedidosTest() {

  // 📊 Interfaces
  interface PedidosResponse {
    total_pedidos: number;
    filtros: Filtros;
    distribucion_por_estado: DistribucionEstado[];
    detalle: PedidoDetalle[];
  }

  interface Filtros {
    estado: string | null;
    fecha_inicio: string | null;
    fecha_fin: string | null;
    metodo_pago: string | null;
  }

  interface DistribucionEstado {
    estado: string;
    cantidad: number;
    monto_total: number;
  }

  interface PedidoDetalle {
    id_order: number;
    order_number: string;
    estado: EstadoPedido;
    nombre_cliente: string;
    email_cliente: string;
    total_amount: number;
    metodo_pago: MetodoPago | null;
    order_date: string;
  }

  type EstadoPedido =
    | "ACCEPTED"
    | "CANCELLED_BY_EMPLOYEE"
    | "PENDING";

  type MetodoPago =
    | "CASH"
    | "CARD"
    | "TRANSFER";

  // 🧠 States
  const [data, setData] = useState<PedidosResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔎 filtros
  const [estado, setEstado] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [metodoPago, setMetodoPago] = useState("");

  // 🔥 Fetch
  const fetchData = async () => {
    try {
      setLoading(true);

      const params: any = {};

      if (estado) params.estado = estado;
      if (fechaInicio) params.fecha_inicio = fechaInicio;
      if (fechaFin) params.fecha_fin = fechaFin;
      if (metodoPago) params.metodo_pago = metodoPago;

      const response = await analyticsClient.get<PedidosResponse>(
        "/reports/pedidos",
        { params }
      );

      setData(response.data);

    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al traer pedidos";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // 📥 Descargar
  const downloadReport = async (format: "csv" | "xlsx") => {
    try {
      const params: any = { format };

      if (estado) params.estado = estado;
      if (fechaInicio) params.fecha_inicio = fechaInicio;
      if (fechaFin) params.fecha_fin = fechaFin;
      if (metodoPago) params.metodo_pago = metodoPago;

      const response = await analyticsClient.get("/reports/pedidos", {
        params,
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `pedidos.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch {
      toast.error("Error descargando archivo");
    }
  };

  // 🔄 Reset filtros
  const resetFilters = () => {
    setEstado("");
    setFechaInicio("");
    setFechaFin("");
    setMetodoPago("");

    setTimeout(() => {
      fetchData();
    }, 0);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const COLORS = ["#4caf50", "#f44336", "#ff9800",];

  // ⏳ Loading
  if (loading) {
    return <LoadingSpinner/>
  }

  // ❌ Error
  if (!data) {
    return <p style={{ padding: "20px" }}>Error cargando datos</p>;
  }

  // 📊 Transformación gráfica
  const chartData = data.distribucion_por_estado.map(item => ({
    estado: item.estado,
    cantidad: item.cantidad
  }));

  // helpers visuales
  const formatEstado = (estado: string | undefined) => {
    switch (estado) {
      case "ACCEPTED": return "Aceptado";
      case "PENDING": return "Pendiente";
      case "CANCELLED_BY_EMPLOYEE": return "Cancelado";
      default: return estado;
    }
  };

  const formatPago = (pago: string | null) => {
    switch (pago) {
      case "CASH": return "Efectivo";
      case "CARD": return "Tarjeta";
      case "TRANSFER": return "Transferencia";
      default: return "N/A";
    }
  };

  return (
    <div className="dashboard">

      <h2><MdDeliveryDining color="#E53935"/>Pedidos</h2>

      {/* 🔎 FILTROS */}
      <div className="filters">

        <div>
          <label>Estado</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="ACCEPTED">Aceptados</option>
            <option value="PENDING">Pendientes</option>
            <option value="CANCELLED_BY_EMPLOYEE">Cancelados</option>
          </select>
        </div>

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

        <div>
          <label>Método de pago</label>
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="CASH">Efectivo</option>
            <option value="CARD">Tarjeta</option>
            <option value="TRANSFER">Transferencia</option>
          </select>
        </div>

        <ButtonFilter onClick={fetchData} />

        <ButtonReset onClick={resetFilters} />

      </div>

      {/* 📥 DESCARGAS */}
      <div style={{ marginTop: "10px", display: "flex", gap: "0.4rem", marginBottom: "10px" }}>
        <ButtonDownload text="Descargar CSV" onClick={() => downloadReport("csv")} />
        <ButtonDownload text="Descargar Excel" onClick={() => downloadReport("xlsx")} />
      </div>

      {/* 📊 CARDS */}
      <div className="cards">

        <div className="card">
          <h4>Total pedidos</h4>
          <p>{data.total_pedidos}</p>
        </div>

        <div className="card">
          <h4>Ingresos</h4>
          <p>
            ${data.distribucion_por_estado
              .reduce((acc, item) => acc + item.monto_total, 0)
              .toLocaleString()}
          </p>
        </div>

      </div>

      {/* 📊 GRÁFICA */}
      <div className="chart-container">
        <h3>Pedidos por estado</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="cantidad"
              nameKey="estado"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) =>
                `${formatEstado(name)}: ${value}`
              }
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: any, name: any) => [
                `${value ?? 0} pedidos`,
                formatEstado(String(name))
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🧾 TABLA */}
      <div className="table-container">
        <h3>Detalle de pedidos</h3>

        <TableLayout>
          <TableHead>
            <tr>
              <Th>#</Th>
              <Th>Cliente</Th>
              <Th>Estado</Th>
              <Th>Total</Th>
              <Th>Pago</Th>
              <Th>Fecha</Th>
            </tr>
          </TableHead>

          <TableBody>
            {data.detalle.map(p => (
              <tr key={p.id_order}>
                <Td>{p.order_number}</Td>
                <Td>{p.nombre_cliente}</Td>
                <Td>{formatEstado(p.estado)}</Td>
                <Td>${p.total_amount.toLocaleString()}</Td>
                <Td>{formatPago(p.metodo_pago)}</Td>
                <Td>{p.order_date}</Td>
              </tr>
            ))}
          </TableBody>
        </TableLayout>

      </div>

    </div>
  );
}