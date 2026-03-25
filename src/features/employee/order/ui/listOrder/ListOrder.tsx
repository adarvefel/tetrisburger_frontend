import React, { useState } from 'react'
import "./listOrder.css"
import { useListOrder } from '../../hooks/useListOrder'
import {
  TableActions,
  TableBody,
  TableHead,
  TableLayout,
  TablePagination,
  Td,
  Th
} from '../../../../../shared/components/componetsCrud/table/TableComponents';

import LoadingSpinner from '../../../../../shared/components/loadings/loadingSpinner/LoadingSpinner';

export default function ListOrder() {

  const {
    loading,
    orders,
    numberPage,
    totalPage,
    nextPage,
    prevPage,
    handleListOrders,
  } = useListOrder();



  return (
    <div className="listOrder__container-global">


      <div className="listOrder__container-top">


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


        
                <Td>${order.totalAmount}</Td>

                <Td>
                  <span className={`tableComponents__span-${order.status === 'PAID' ? "green" : "red"}`}>
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