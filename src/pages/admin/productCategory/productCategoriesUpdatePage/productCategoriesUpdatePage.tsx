import "./productCategoriesUpdatePage.css";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import CategoryUpdate from "../../../../features/admin/productCategory/ui/productCategoryUpdate/ProductCategoryUpdate";

export default function ProductCategoriesUpdatePage() {
  return (
    <div className="productsCreate__container-global">
      <AdminSidebar />
      <div className="productsCreate__container-content">
        <CategoryUpdate />
      </div>
    </div>
  );
}
