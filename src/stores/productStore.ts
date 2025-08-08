import { create } from "zustand";
import type { Product } from "@/types/product";
import type { PaginatedResponse } from "@/types/paginated";

interface ProductStore {
  products: Product[];
  meta: PaginatedResponse<Product>["meta"] | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;

  setProducts: (response: PaginatedResponse<Product>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  removeProduct: (id: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  meta: null,
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 10,

  setProducts: (response) =>
    set({
      products: response.items,
      meta: response.meta,
      currentPage: response.meta.currentPage,
    }),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (itemsPerPage) => set({ itemsPerPage }),

  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),

  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.productId === id ? { ...p, ...updatedProduct } : p
      ),
    })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.productId !== id),
    })),
}));
