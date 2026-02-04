export interface SupplierDto {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface ListSupplierResponseDto {
  items: SupplierDto[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface CreateSupplierDto {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface UpdateSupplierDto {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
}
