import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

import "./testPage.css";
import { analyticsClient } from "../shared/api/analyticsClient";

type Estado = {
  cantidad: number;
  total_monto: number;
};

type MetodoPago = {
  transacciones: number;
  total_recaudado: number;
};

type Metricas = {
  total_ventas: number;
  total_pedidos: number;
  ticket_promedio: number;
  pedidos_por_estado: Record<string, Estado>;
  ingresos_por_metodo_pago: Record<string, MetodoPago>;
  periodo: {
    fecha_inicio: string;
    fecha_fin: string;
  };
};

export default function TestPage() {
  const [data, setData] = useState<Metricas | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔥 FILTROS
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // 🔥 FUNCIÓN PARA CONSULTAR
  const fetchData = () => {
    setLoading(true);

    analyticsClient.get<Metricas>("/reports/metricas", {
      params: {
        fecha_inicio: fechaInicio || undefined,
        fecha_fin: fechaFin || undefined
      }
    })
      .then(res => {
        console.log("DATA 👉", res.data);
        setData(res.data);
      })
      .catch(err => console.error("ERROR 👉", err))
      .finally(() => setLoading(false));
  };

  // 🔥 PRIMERA CARGA
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Cargando métricas...</p>;
  }

  if (!data) {
    return <p style={{ padding: "20px" }}>Error cargando datos</p>;
  }

  // 🔥 TRANSFORMACIONES
  const estadosData = Object.entries(data.pedidos_por_estado || {}).map(
    ([estado, valores]) => ({
      estado,
      cantidad: valores.cantidad
    })
  );

  const pagosData = Object.entries(data.ingresos_por_metodo_pago || {}).map(
    ([metodo, valores]) => ({
      metodo,
      total: valores.total_recaudado
    })
  );

  return (
    <div className="dashboard">
      <h2>📊 Dashboard TetriBurger</h2>

      {/* 🔥 FILTROS */}
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

        <button onClick={fetchData}>
          Filtrar
        </button>
      </div>

      {/* 🔥 CARDS */}
      <div className="cards">
        <div className="card">
          <h4>💰 Ventas Totales</h4>
          <p>${data.total_ventas.toLocaleString()}</p>
        </div>

        <div className="card">
          <h4>📦 Pedidos</h4>
          <p>{data.total_pedidos}</p>
        </div>

        <div className="card">
          <h4>🧾 Ticket Promedio</h4>
          <p>${data.ticket_promedio.toLocaleString()}</p>
        </div>
      </div>

      {/* 📊 PEDIDOS POR ESTADO */}
      <div className="chart-container">
        <h3>Pedidos por estado</h3>
        <BarChart width={700} height={300} data={estadosData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="estado" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" />
        </BarChart>
      </div>

      {/* 💳 INGRESOS POR MÉTODO */}
      <div className="chart-container">
        <h3>Ingresos por método de pago</h3>
        <BarChart width={700} height={300} data={pagosData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metodo" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" />
        </BarChart>
      </div>

      {/* 📅 PERIODO */}
      <div style={{ marginTop: "20px" }}>
        <strong>Periodo:</strong> {data.periodo.fecha_inicio} → {data.periodo.fecha_fin}
      </div>
    </div>
  );
}