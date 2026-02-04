import "./suppliersUpdatePage.css";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import SupplierUpdate from "../../../../features/admin/supplier/ui/suppliersUpdate/SupplierUpdate";

export default function SuppliersUpdatePage() {
  return (
    <div className="productsCreate__container-global">
      <AdminSidebar />
      <div className="productsCreate__container-content">
        <SupplierUpdate />
      </div>
    </div>
  );
}
