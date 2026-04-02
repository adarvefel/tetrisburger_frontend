import {
    TableBody,
    TableHead,
    TableLayout,
    TablePagination,
    Td,
    Th
} from '../../../../shared/components/componetsCrud/table/TableComponents';
import { useListOrdersMe } from "../hooks/useListOrdersMe";
import LoadingSpinner from "../../../../shared/components/loadings/loadingSpinner/LoadingSpinner";
import "./listOrdersMe.css"
import TittleCrud from '../../../../shared/components/componetsCrud/tittle/TittleCrud';
import Line from '../../../../shared/components/componetsCrud/fields/line/Line';

export default function ListOrderMe() {

    const {
        loading,
        orders,
        numberPage,
        totalPage,
        nextPage,
        prevPage,
    } = useListOrdersMe();


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
        <div className="listOrderMe__container-global">

            <TittleCrud tittle='Historial de mis ordenes'/>

            <Line/>

            {loading ? <LoadingSpinner /> : (
                <TableLayout>
                    <TableHead>
                        <tr>
                            <Th>ID</Th>
                            <Th>Número de orden</Th>
                            <Th>TOTAL</Th>
                            <Th>ESTADO</Th>
                            <Th>FECHA DE CREACIÓN</Th>
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
    );
}