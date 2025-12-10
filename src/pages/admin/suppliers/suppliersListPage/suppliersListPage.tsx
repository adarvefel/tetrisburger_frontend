import "./suppliersListPage.css";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import SuppliersList from "../../../../features/admin/supplier/ui/suppliersList/SupplierList";

export default function SuppliersListPage() {
  return (
    <div className="productsListPage__container-global">
      <AdminSidebar />
      <div className="productsListPage__container-content">
        <SuppliersList />
      </div>
    </div>
  );
}