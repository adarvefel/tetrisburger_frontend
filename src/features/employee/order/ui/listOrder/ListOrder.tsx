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


  //Tin paras las tan

  const statusOptions = [
    { value: "PENDING", label: "Pendiente" },
    { value: "ACCEPTED", label: "Aceptada" },
    { value: "REJECTED", label: "Rechazada" },
  ];



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
                  <span className={`tableComponents__span-${order.status === 'ACCEPTED' ? "green" : "red"}`}>
                    {order.status}
                  </span>
                </Td>

                <Td>{order.orderDate}</Td>

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