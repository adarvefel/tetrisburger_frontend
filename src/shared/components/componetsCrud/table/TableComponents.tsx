import "./tableComponents.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export function TableLayout({ children }: any) {
  return <table className="tableComponents__table">{children}</table>;
}

export const TableHead = ({ children }: any) => (
  <thead className="tableComponents__thead">{children}</thead>
);

export const TableBody = ({ children }: any) => (
  <tbody className="tableComponents__tbody">{children}</tbody>
);

export const Th = ({ children }: any) => (
  <th className="tableComponents__th">{children}</th>
);

export const Td = ({ children }: any) => (
  <td className="tableComponents__td">{children}</td>
);



interface TableActionsProps {
  linkEdit: string;
  onDelete: () => void
}

export function TableActions({linkEdit, onDelete}: TableActionsProps) {
  return (
    <div className="tableComponents__container-actions">
        <Link className="tableComponents__button-edit" to={linkEdit}><CiEdit size={18} /></Link>
        <button className='tableComponents__button-delete' onClick={onDelete}> <MdDeleteOutline size={18} /> </button>
    </div>
  );
}






interface TablePaginationProps {
  numberPage: number;
  totalPage: number;
  onPrev: () => void;
  onNext: () => void;
}

export function TablePagination({ numberPage, totalPage, onPrev, onNext }: TablePaginationProps) {
  return (
    <div className="tableComponents__container-pages">
      <button className="tableComponents__button" onClick={onPrev} disabled={numberPage == 0}><FaArrowLeft size={18}/> </button> 
      <p className="tableComponents__p"> Página {numberPage + 1} de {totalPage} </p>
      <button className="tableComponents__button" onClick={onNext} disabled={numberPage + 1 == totalPage}><FaArrowRight size={18}/> </button>
    </div>
  );
}