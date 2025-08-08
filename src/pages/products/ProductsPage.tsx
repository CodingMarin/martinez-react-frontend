import { useState } from "react";
import {
  useProducts,
  useCreateProduct,
  useDeleteProduct,
} from "../../hooks/useProducts";
import { ProductForm } from "../../components/forms/ProductForm";
import type { Product, CreateProductDto } from "../../types/product";
import { ProductTable } from "../../components/tables/ProductTable";

export const ProductsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data, isLoading, error } = useProducts({ page, limit });
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();

  const handleCreateProduct = async (data: CreateProductDto) => {
    try {
      await createProduct.mutateAsync(data);
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct.mutateAsync(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <h3 className="font-semibold mb-2">Error al cargar productos</h3>
          <p className="text-sm">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Reintentar
          </button>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-600 mt-1">
            Gestiona tu inventario de productos
          </p>
          {/* Mostrar info de paginación en el header */}
          {data && (
            <p className="text-sm text-gray-500 mt-1">
              {data.meta.totalItems} productos en total
            </p>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            + Nuevo Producto
          </button>
        </div>
      </div>

      {/* Form Modal/Section */}
      {showForm && (
        <div className="mb-6 bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingProduct ? "Editar Producto" : "Nuevo Producto"}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          <ProductForm
            initialData={editingProduct}
            onSubmit={handleCreateProduct}
            loading={createProduct.isPending}
          />
        </div>
      )}

      <div className="hidden md:block">
        {data && (
          <ProductTable
            data={data}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        )}
      </div>
      <div className="md:hidden">
        {/** Proximament:
         * Mostrar cards para vista mobile
         */}
      </div>
    </div>
  );
};
