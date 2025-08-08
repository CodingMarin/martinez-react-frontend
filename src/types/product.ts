export interface Product {
  productId: string;
  name: string;
  brand?: string;
  description?: string;
  price: number;
  stock: number;
  sku?: string;
  measure?: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  brand?: string;
  description?: string;
  price: number;
  stock: number;
  sku?: string;
  measureId: string;
  categoryId: string;
}
