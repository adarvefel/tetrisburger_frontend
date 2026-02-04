import "./suppliersCreatePage.css";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import SupplierCreate from "../../../../features/admin/supplier/ui/suppliersCreate/SupplierCreate";

export default function SuppliersCreatePage() {
  return (
    <div className="productsCreate__container-global">
      <AdminSidebar />
      <div className="productsCreate__container-content">
        <SupplierCreate />
      </div>
    </div>
  );
}
