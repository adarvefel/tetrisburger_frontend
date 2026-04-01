import { useState } from "react";
import { useOrderActions } from "../../hooks/useOrderActions";
import { OrderResponseDTO } from "../../../../../entities/order/dto/orderDto";
import "./orderActionModal.css";
import { MdClose, MdPayment, MdSwapHoriz } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { toast } from "sonner";

interface Props {
  order: OrderResponseDTO;
  onClose: () => void;
  onSuccess: () => void;
}

const statusOptions = [
  { value: "PENDING",               label: "Pendiente" },
  { value: "ACCEPTED",              label: "Aceptada" },
  { value: "IN_PROGRESS",           label: "En progreso" },
  { value: "COMPLETED",             label: "Completada" },
  { value: "CANCELLED_BY_EMPLOYEE", label: "Cancelada por empleado" },
];

const paymentOptions = [
  { value: "CASH",     label: "Efectivo" },
  { value: "CARD",     label: "Tarjeta" },
  { value: "TRANSFER", label: "Transferencia" },
];

export default function OrderActionsModal({ order, onClose, onSuccess }: Props) {
  const { loading, handleCreatePayment, handleUpdateOrder } = useOrderActions();

  // Si está en PENDING no tiene pago aún
  const hasPayment = order.status !== "PENDING";

  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(order.status);

  const handleSavePayment = async () => {
    if (!selectedPayment) {
      toast.error("Selecciona un método de pago.");
      return;
    }
    const res = await handleCreatePayment({ idOrder: order.idOrder, paymentMethod: selectedPayment });
    if (res) onSuccess();
  };

  const handleSaveStatus = async () => {
    if (!hasPayment) {
      toast.error("Registra un método de pago antes de cambiar el estado.");
      return;
    }
    const res = await handleUpdateOrder(order.idOrder, selectedStatus);
    if (res) onSuccess();
  };

  return (
    <div className="oam__backdrop" onClick={onClose}>
      <div className="oam__panel" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="oam__header">
          <div>
            <span className="oam__tag">#{order.orderNumber}</span>
            <h2 className="oam__title">Gestionar orden</h2>
          </div>
          <button className="oam__close" onClick={onClose}>
            <MdClose size={20} />
          </button>
        </div>

        {/* Sección 1 — Pago */}
        <section className="oam__section">
          <div className="oam__section-header">
            <MdPayment size={18} />
            <h3>Método de pago</h3>
            {hasPayment
              ? <span className="oam__badge oam__badge--green">Registrado</span>
              : <span className="oam__badge oam__badge--yellow">Pendiente</span>
            }
          </div>

          {hasPayment ? (
            <div className="oam__locked-box">
              <FaLock size={13} />
              <p>El método de pago ya fue registrado y no puede modificarse.</p>
            </div>
          ) : (
            <div className="oam__field-row">
              <select
                className="oam__select"
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
              >
                <option value="">Selecciona un método...</option>
                {paymentOptions.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <button
                className="oam__btn oam__btn--indigo"
                onClick={handleSavePayment}
                disabled={loading}
              >
                {loading ? "Guardando..." : "Registrar"}
              </button>
            </div>
          )}
        </section>

        <div className="oam__divider" />

        {/* Sección 2 — Estado */}
        <section className={`oam__section ${!hasPayment ? "oam__section--disabled" : ""}`}>
          <div className="oam__section-header">
            <MdSwapHoriz size={18} />
            <h3>Estado de la orden</h3>
            {!hasPayment && <span className="oam__badge oam__badge--gray">Requiere pago</span>}
          </div>

          {!hasPayment && (
            <p className="oam__warning-text">
              ⚠️ Primero debes registrar un método de pago para poder cambiar el estado.
            </p>
          )}

          <div className="oam__field-row">
            <select
              className="oam__select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              disabled={!hasPayment}
            >
              {statusOptions.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <button
              className="oam__btn oam__btn--dark"
              onClick={handleSaveStatus}
              disabled={loading || !hasPayment}
            >
              {loading ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}