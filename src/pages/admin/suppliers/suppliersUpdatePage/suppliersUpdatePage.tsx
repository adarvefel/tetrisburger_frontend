import "./suppliersUpdatePage.css";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import SupplierUpdate from "../../../../features/admin/supplier/ui/suppliersUpdate/SupplierUpdate";

export default function SuppliersUpdatePage() {
  return (
    <div className="supplierUpdatePage__container-global">
      <AdminSidebar />
      <div className="supplierUpdatePage__container-content">
        <SupplierUpdate />
      </div>
    </div>
  );
}
