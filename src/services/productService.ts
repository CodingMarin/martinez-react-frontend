import api from "./api";
import type { Product, CreateProductDto } from "../types/product";
import type { PaginatedResponse, PaginationParams } from "@/types/paginated";

export const productService = {
  getAll: (params?: PaginationParams) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const queryString = searchParams.toString();
    const url = queryString ? `/products?${queryString}` : "/products";

    return api.get<PaginatedResponse<Product>>(url);
  },
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  create: (data: CreateProductDto) => api.post<Product>("/products", data),
  update: (id: string, data: Partial<CreateProductDto>) =>
    api.put<Product>(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};
