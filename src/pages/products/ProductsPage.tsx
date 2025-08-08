import { useState } from "react";
import { useProducts, useCreateProduct } from "../../hooks/useProducts";
import { ProductForm } from "../../components/forms/ProductForm";
import { ProductList } from "../../components/ProductList";
import { ProductGrid } from "../../components/ProductGrid";
import type { Product, CreateProductDto } from "../../types/product";

export const ProductsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const { data: products, isLoading, error } = useProducts();
  const createProduct = useCreateProduct();

  const handleCreateProduct = async (data: CreateProductDto) => {
    try {
      await createProduct.mutateAsync(data);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
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
        Error al cargar productos: {error.message}
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
        </div>

        <div className="flex space-x-3">
          {/* Toggle View Mode */}
          <div className="flex rounded-lg border border-gray-300">
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === "table"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } rounded-l-lg border-r border-gray-300`}
            >
              Tabla
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === "grid"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } rounded-r-lg`}
            >
              Tarjetas
            </button>
          </div>

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
              className="text-gray-500 hover:text-gray-700"
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

      {viewMode === "table" ? (
        <ProductList
          products={products || []}
          onEdit={handleEditProduct}
          onDelete={() => {}}
        />
      ) : (
        <ProductGrid
          products={products || []}
          onEdit={handleEditProduct}
          onDelete={() => {}}
        />
      )}
    </div>
  );
};
