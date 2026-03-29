import { useState } from "react";

import Ventas from "../ventas/TestPage";
import Pedidos from "../pedidos/PedidosTest";
import Productos from "../topProducts/TopProducts";
import Metricas from "../metricas/Metricas";
import DebugTablas from "../debugTablas/DebugTablas";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BsBoxSeamFill } from "react-icons/bs";
import { MdDeliveryDining } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa6";

import "./dashboardMain.css";

type Tab =
  | "ventas"
  | "pedidos"
  | "productos"
  | "metricas"
  | "debug";

export default function DashboardMain() {

  const [activeTab, setActiveTab] = useState<Tab>("metricas");

  const renderContent = () => {
    switch (activeTab) {
      case "ventas":
        return <Ventas />;
      case "pedidos":
        return <Pedidos />;
      case "productos":
        return <Productos />;
      case "metricas":
        return <Metricas />;
      case "debug":
        return <DebugTablas />;
      default:
        return null;
    }
  };

  return (
    <div className="main-dashboard">

      <h1>Análisis de TetrisBurger</h1>

      {/* 🔥 NAV TABS */}
      <div className="tabs">

        <button
          className={activeTab === "metricas" ? "active" : ""}
          onClick={() => setActiveTab("metricas")}
        >
          <FaMoneyBillTrendUp size={15} />
          Métricas
        </button>

        <button
          className={activeTab === "ventas" ? "active" : ""}
          onClick={() => setActiveTab("ventas")}
        >
          <RiMoneyDollarCircleFill size={15} />
          Ventas
        </button>

        <button
          className={activeTab === "pedidos" ? "active" : ""}
          onClick={() => setActiveTab("pedidos")}
        >
          <MdDeliveryDining size={15} />
          Pedidos
        </button>

        <button
          className={activeTab === "productos" ? "active" : ""}
          onClick={() => setActiveTab("productos")}
        >
          <BsBoxSeamFill size={15} />
          Productos
        </button>

        <button
          className={activeTab === "debug" ? "active" : ""}
          onClick={() => setActiveTab("debug")}
        >
          <FaClipboardList size={15}/>
          Generales
        </button>

      </div>

      {/* 📄 CONTENIDO */}
      <div className="tab-content">
        {renderContent()}
      </div>

    </div>
  );
}