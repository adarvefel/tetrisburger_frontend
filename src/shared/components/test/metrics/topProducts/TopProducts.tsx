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

import "./topProducts.css";
import { analyticsClient } from "../../../../api/analyticsClient";
import { toast } from "sonner";
import ButtonDownload from "../../../buttonDownload/ButtonDownload";
import ButtonFilter from "../../../buttonFIlter/ButtonFIlter";
import ButtonReset from "../../../buttonReset/ButtonReset";
import LoadingSpinner from "../../../loadings/loadingSpinner/LoadingSpinner";
import { BsBoxSeamFill } from "react-icons/bs";
import { TableBody, TableHead, TableLayout, Td, Th } from "../../../componetsCrud/table/TableComponents";

export default function TopProducts() {

  // 📊 Interfaces
  interface TopProductsResponse {
    categoria_filtro: string | null;
    top: TopItem[];
  }

  interface TopItem {
    item_name: string;
    item_type: ItemType;
    categoria: string;
    total_vendidos: number;
    total_ingresos: number;
    precio_promedio: number;
  }

  type ItemType = "BURGER" | "PRODUCT";

  // 🧠 States
  const [data, setData] = useState<TopProductsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔎 filtros
  const [categoria, setCategoria] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [limit, setLimit] = useState(10);

  // 🔥 Fetch
  const fetchData = async () => {
    try {
      setLoading(true);

      const params: any = {};

      if (categoria) params.categoria = categoria;
      if (fechaInicio) params.fecha_inicio = fechaInicio;
      if (fechaFin) params.fecha_fin = fechaFin;
      if (limit) params.limit = limit;

      const response = await analyticsClient.get<TopProductsResponse>(
        "/reports/productos-top",
        { params }
      );

      setData(response.data);

    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al traer productos";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // 📥 Descargar
  const downloadReport = async (format: "csv" | "xlsx") => {
    try {
      const params: any = { format };

      if (categoria) params.categoria = categoria;
      if (fechaInicio) params.fecha_inicio = fechaInicio;
      if (fechaFin) params.fecha_fin = fechaFin;
      if (limit) params.limit = limit;

      const response = await analyticsClient.get("/reports/productos-top", {
        params,
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `productos_top.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch {
      toast.error("Error descargando archivo");
    }
  };

  // 🔄 Reset filtros
  const resetFilters = () => {
    setCategoria("");
    setFechaInicio("");
    setFechaFin("");
    setLimit(10);

    setTimeout(() => {
      fetchData();
    }, 0);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const COLORS = ["#E53935", "#4caf50", "#ff9800", "#2196f3", "#9c27b0"];

  // ⏳ Loading
  if (loading) {
    return <LoadingSpinner/>
  }

  // ❌ Error
  if (!data) {
    return <p style={{ padding: "20px" }}>Error cargando datos</p>;
  }

  // 📊 Transformación gráfica (top 5)
  const chartData = data.top.slice(0, 5).map(item => ({
    nombre: item.item_name,
    vendidos: item.total_vendidos
  }));

  // 💰 total ingresos
  const totalIngresos = data.top.reduce(
    (acc, item) => acc + item.total_ingresos,
    0
  );

  // helpers
  const formatTipo = (tipo: ItemType) => {
    return tipo === "BURGER" ? "Hamburguesa" : "Producto";
  };

  return (
    <div className="dashboard">

      <h2><BsBoxSeamFill color="#E53935"/> Top productos</h2>

      {/* 🔎 FILTROS */}
      <div className="filters">

        <div>
          <label>Categoría</label>
          <input
            type="text"
            placeholder="Ej: Bebidas"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
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
          <label>Límite</label>
          <input
            type="number"
            min={1}
            max={50}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
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
          <h4>Total productos</h4>
          <p>{data.top.length}</p>
        </div>

        <div className="card">
          <h4>Ingresos generados</h4>
          <p>${totalIngresos.toLocaleString()}</p>
        </div>

      </div>

      {/* 📊 GRÁFICA */}
      <div className="chart-container">
        <h3>Top 5 más vendidos</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="vendidos">
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🧾 TABLA */}
      <div className="table-container">
        <h3>Detalle</h3>

        <TableLayout>
          <TableHead>
            <tr>
              <Th>Producto</Th>
              <Th>Tipo</Th>
              <Th>Categoría</Th>
              <Th>Vendidos</Th>
              <Th>Ingresos</Th>
              <Th>Precio promedio</Th>
            </tr>
          </TableHead>

          <TableBody>
            {data.top.map((item, index) => (
              <tr key={index}>
                <Td>{item.item_name}</Td>
                <Td>{formatTipo(item.item_type)}</Td>
                <Td>{item.categoria}</Td>
                <Td>{item.total_vendidos}</Td>
                <Td>${item.total_ingresos.toLocaleString()}</Td>
                <Td>${item.precio_promedio.toLocaleString()}</Td>
              </tr>
            ))}
          </TableBody>
        </TableLayout>

      </div>

    </div>
  );
}