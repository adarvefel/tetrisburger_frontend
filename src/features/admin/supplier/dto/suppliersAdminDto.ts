export interface SupplierFetchList {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
}


export interface SupplierListResponse {
  items: SupplierFetchList[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
