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
import { useUpdateOrder } from "../../hooks/useUpdateOrder";
import { toast } from "sonner";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usePreviewOrder } from "../../hooks/usePreviewOrder";
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
    setDate
  } = useListOrder();

  const { handleUpdateOrder } = useUpdateOrder();

  const { handlePreviewOrder } = usePreviewOrder();




  //Tin paras las tan

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

        {/* izquierda */}
        <div className="listOrder__left">
          <InputSearch placeholder='Buscar por codigo ...' name='codeOrder' />
        </div>

        {/* derecha */}
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
              <Th>Numbero de orden</Th>
              <Th>TOTAL</Th>
              <Th>ESTADO</Th>
              <Th>FECHA</Th>
              <Th>ACCIONES</Th>
            </tr>
          </TableHead>

          <TableBody>
            {orders?.map((order) => (
              <tr key={order.idOrder}>

                <Td>{order.idOrder}</Td>

                <Td>{order.orderNumber}</Td>



                <Td>{new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0
                }).format(order.totalAmount)}</Td>

                <Td>

                  {getStatusLabel(order.status)}
                </Td>

                <Td>{order.orderDate}</Td>

                <Td>
                  <div className="listOrder__container-actions">

                    <button className="tableComponents__button-edit" ><MdEdit size={18} /></button>
                    <button className="tableComponents__button-edit" onClick={() => handlePreviewOrder(order.idOrder)}><FaEye size={18} /></button>
                    
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

    </div>
  )
}