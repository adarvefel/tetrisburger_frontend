import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

import "./testPage.css";
import { analyticsClient } from "../../../../api/analyticsClient";
import { toast } from "sonner";
import ButtonFilter from "../../../buttonFIlter/ButtonFIlter";
import ButtonReset from "../../../buttonReset/ButtonReset";
import ButtonDownload from "../../../buttonDownload/ButtonDownload";
import LoadingSpinner from "../../../loadings/loadingSpinner/LoadingSpinner";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

// 📊 Interfaces
export interface VentasResponse {
  fecha_inicio: string | null;
  fecha_fin: string | null;
  total_general: number;
  numero_pedidos: number;
  ticket_promedio: number;
  detalle: DetalleVentas[];
}

export interface DetalleVentas {
  fecha: string;
  numero_pedidos: number;
  total_ventas: number;
  ticket_promedio: number;
}

export default function TestPage() {
  const [data, setData] = useState<VentasResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // 🆕 Estados de filtros
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [metodoPago, setMetodoPago] = useState("");

  // 🔥 Fetch con filtros
  const fetchData = async () => {
    try {
      setLoading(true);

      const params: any = {};

      if (fechaInicio) params.fecha_inicio = fechaInicio;
      if (fechaFin) params.fecha_fin = fechaFin;
      if (metodoPago) params.metodo_pago = metodoPago;

      const response = await analyticsClient.get<VentasResponse>(
        "/reports/ventas",
        { params }
      );

      setData(response.data);

    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al traer los datos.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // 📥 Descargar ventas
  const downloadReport = async (format: "csv" | "xlsx") => {
    try {
      const params: any = { format };

      if (fechaInicio) params.fecha_inicio = fechaInicio;
      if (fechaFin) params.fecha_fin = fechaFin;
      if (metodoPago) params.metodo_pago = metodoPago;

      const response = await analyticsClient.get("/reports/ventas", {
        params,
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `ventas.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch {
      toast.error("Error descargando archivo");
    }
  };

  // 🔄 Reset filtros
  const resetFilters = () => {
    setFechaInicio("");
    setFechaFin("");
    setMetodoPago("");

    // volver a cargar sin filtros
    setTimeout(() => {
      fetchData();
    }, 0);
  };

  // Primera carga
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner/>
  }

  if (!data) {
    return <p style={{ padding: "20px" }}>Error cargando datos</p>;
  }

  // 📊 Transformación
  const chartData = data.detalle
    .slice() // evita mutar el original
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .map(item => ({
      fecha: item.fecha,
      ventas: item.total_ventas,
      pedidos: item.numero_pedidos
    }));

  return (
    <div className="dashboard">
      <h2><RiMoneyDollarCircleFill color="#E53935"/> Dashboard TetriBurger</h2>

      {/* 🆕 FILTROS */}
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

        

        <ButtonFilter onClick={fetchData}/>

        <ButtonReset onClick={resetFilters}/>

        
      </div>

      {/* 📥 DESCARGAS */}
      <div style={{ marginTop: "10px" , display: "flex", gap: "0.4rem", marginBottom: "10px"}}>
        <ButtonDownload text="Descargar CSV" onClick={() => downloadReport("csv")}/>
        <ButtonDownload text="Descargar Excel" onClick={() => downloadReport("xlsx")}/>
      </div>

      {/* 🧾 CARDS */}
      <div className="cards">
        <div className="card">
          <h4>Total ventas</h4>
          <p>${data.total_general.toLocaleString()}</p>
        </div>

        <div className="card">
          <h4>Pedidos</h4>
          <p>{data.numero_pedidos}</p>
        </div>

        <div className="card">
          <h4>Ticket promedio</h4>
          <p>${data.ticket_promedio.toLocaleString()}</p>
        </div>
      </div>

      {/* 📊 GRÁFICA */}
      <div className="chart-container">
        <h3>Ventas por día</h3>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>

            {/* 🎨 Gradiente rojo */}
            <defs>
              <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E53935" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#E53935" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

            <XAxis
              dataKey="fecha"
              tick={{ fontSize: 12 }}
              stroke="#888"
            />

            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#888"
              tickFormatter={(value) =>
                new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0
                }).format(value)
              }
            />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
              formatter={(value: any) =>
                new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0
                }).format(value)
              }
            />

            {/* 🔥 Área + línea en uno */}
            <Area
              type="monotone"
              dataKey="ventas"
              stroke="#E53935"
              strokeWidth={3}
              fill="url(#colorVentas)"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}