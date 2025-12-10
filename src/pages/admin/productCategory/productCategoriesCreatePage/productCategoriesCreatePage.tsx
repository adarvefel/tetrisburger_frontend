import "./productCategoriesCreatePage.css";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import CategoryCreate from "../../../../features/admin/productCategory/ui/productCategoriesCreate/ProductCategoriesCreate";

export default function ProductCategoriesCreatePage() {
  return (
    <div className="productsCreate__container-global">
      <AdminSidebar />
      <div className="productsCreate__container-content">
        <CategoryCreate />
      </div>
    </div>
  );
}
