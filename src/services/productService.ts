import api from "./api";
import type { Product, CreateProductDto } from "../types/product";

export const productService = {
  getAll: () => api.get<Product[]>("/products"),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  create: (data: CreateProductDto) => api.post<Product>("/products", data),
  update: (id: string, data: Partial<CreateProductDto>) =>
    api.put<Product>(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};
