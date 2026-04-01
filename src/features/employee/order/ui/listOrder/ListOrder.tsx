import "./listOrder.css"
import { useListOrder } from '../../hooks/useListOrder'
import {
  TableBody,
  TableHead,
  TableLayout,
  TablePagination,
  Td,
  Th
} from '../../../../../shared/components/componetsCrud/table/TableComponents';
import LoadingSpinner from '../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner';
import InputSearch from '../../../../../shared/components/componetsCrud/fields/inputSearch/InputSearch';
import SelectCrud from "../../../../../shared/components/componetsCrud/fields/selectCrud/SelectCrud";
import OrderActionsModal from "../../ui/orderActionModal/OrderActionModal";
import { usePreviewOrder } from "../../hooks/usePreviewOrder";
import { OrderResponseDTO } from "../../../../../entities/order/dto/orderDto";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function ListOrder() {

  const {
    loading,
    orders,
    numberPage,
    totalPage,
    nextPage,
    prevPage,
    status,
    setStatus,
    date,
    setDate,
    handleListOrders  // necesitas exponer esto en useListOrder para recargar tras el modal
  } = useListOrder();

  const [selectedOrder, setSelectedOrder] = useState<OrderResponseDTO | null>(null);
  const { handlePreviewOrder } = usePreviewOrder();

  const statusOptions = [
    { value: "PENDING", label: "Pendiente" },
    { value: "ACCEPTED", label: "Aceptada" },
    { value: "IN_PROGRESS", label: "En progreso" },
    { value: "COMPLETED", label: "Completada" },
    { value: "CANCELLED_BY_EMPLOYEE", label: "Cancelada" },
  ];

  const getStatusLabel = (status: string) => {
    const found = statusOptions.find(s => s.value === status);
    return found ? found.label : status;
  };

  return (
    <div className="listOrder__container-global">

      <div className="listOrder__container-top">
        <div className="listOrder__left">
          <InputSearch placeholder='Buscar por codigo ...' name='codeOrder' />
        </div>
        <div className="listOrder__right">
          <SelectCrud
            name="status"
            options={statusOptions}
            placeholder="Todos los estados"
            value={status || ""}
            onChange={(e) => setStatus(e.target.value || undefined)}
          />
          <input
            type="date"
            value={date || ""}
            onChange={(e) => setDate(e.target.value || undefined)}
            className="listOrder__input-date"
          />
        </div>
      </div>

      {loading ? <LoadingSpinner /> : (
        <TableLayout>
          <TableHead>
            <tr>
              <Th>ID</Th>
              <Th>Número de orden</Th>
              <Th>TOTAL</Th>
              <Th>ESTADO</Th>
              <Th>FECHA DE CREACIÓN</Th>
              <Th>FECHA DE ACTUALIZACIÓN</Th>
              <Th>CREADO POR</Th>
              <Th>ACTUALIZADO POR</Th>
              <Th>ACCIONES</Th>
            </tr>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <tr key={order.idOrder}>
                <Td>{order.idOrder}</Td>
                <Td>{order.orderNumber}</Td>
                <Td>
                  {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0
                  }).format(order.totalAmount)}
                </Td>
                <Td>
                  <span className={`tableComponents__span-${order.status === "COMPLETED" ? "green" :
                    order.status === "CANCELLED_BY_EMPLOYEE" ? "red" :
                      order.status === "IN_PROGRESS" ? "orange" :
                        order.status === "ACCEPTED" ? "blue" :
                          "yellow"
                    }`}>
                    {getStatusLabel(order.status)}
                  </span>
                </Td>
                <Td>{order.orderDate}</Td>
                <Td>{order.updatedAt ?? "---"}</Td>
                <Td>{order.createdBy ?? "---"}</Td>
                <Td>{order.updatedBy ?? "---"}</Td>
                <Td>
                  <div className="listOrder__container-actions">
                    <button
                      className="tableComponents__button-edit"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <MdEdit size={18} />
                    </button>
                    <button
                      className="tableComponents__button-edit"
                      onClick={() => handlePreviewOrder(order.idOrder)}
                    >
                      <FaEye size={18} />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </TableBody>
        </TableLayout>
      )}

      <TablePagination
        numberPage={numberPage}
        totalPage={totalPage}
        onNext={nextPage}
        onPrev={prevPage}
      />

      {/* Modal */}
      {selectedOrder && (
        <OrderActionsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onSuccess={() => {
            setSelectedOrder(null);
            handleListOrders(); // recarga la lista
          }}
        />
      )}

    </div>
  );
}