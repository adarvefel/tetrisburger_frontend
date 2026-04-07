import "./productCategoriesListPage.css";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import ProductCategoryList from "../../../../features/admin/productCategory/ui/productCategoriesList/ProductCategoriesList";

export default function ProductCategoriesListPage() {
  return (
    <div className="productsListPage__container-global">
      <AdminSidebar />
      <div className="productsListPage__container-content">
        <ProductCategoryList />
      </div>
    </div>
  );
}
