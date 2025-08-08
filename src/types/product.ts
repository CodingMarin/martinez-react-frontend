export interface Product {
  productId?: string;
  name: string;
  brand?: string;
  model?: string | null;
  description?: string;
  price: number;
  stock: number | null;
  sku?: string | null;
  measure?: {
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  brand?: string;
  model?: string;
  description?: string;
  price: number;
  stock: number;
  sku?: string;
  measureId?: string;
  categoryId?: string;
}
