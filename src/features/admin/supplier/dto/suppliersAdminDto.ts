export interface SupplierFetchList {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number,
  updatedBy: number
}


export interface SupplierListResponse {
  items: SupplierFetchList[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
