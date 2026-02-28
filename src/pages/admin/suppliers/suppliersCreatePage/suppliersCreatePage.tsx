import "./suppliersCreatePage.css";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import SupplierCreate from "../../../../features/admin/supplier/ui/suppliersCreate/SupplierCreate";

export default function SuppliersCreatePage() {
  return (
    <div className="supplierCreatePage__container-global">
      <AdminSidebar />
      <div className="supplierCreatePage__container-content">
        <SupplierCreate />
      </div>
    </div>
  );
}
