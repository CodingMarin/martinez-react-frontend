import { useState } from "react";
import type { Product } from "@/types/product";
import type { PaginatedResponse } from "@/types/paginated";

interface ProductListProps {
  data: PaginatedResponse<Product>;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export const ProductList = ({
  data,
  onEdit,
  onDelete,
  onPageChange,
  onLimitChange,
}: ProductListProps) => {
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);
  const { items: products, meta } = data;

  const handleDelete = async (productId: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      setLoadingDelete(productId);
      await onDelete?.(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error al eliminar el producto");
    } finally {
      setLoadingDelete(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No hay productos registrados</p>
        <p className="text-sm">
          Crea tu primer producto usando el botón "Nuevo Producto"
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marca/Modelo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={`${product.name}-${index}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    {product.description && (
                      <div className="text-sm text-gray-500">
                        {product.description}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    {product.brand && (
                      <div className="font-medium">{product.brand}</div>
                    )}
                    {product.model && (
                      <div className="text-gray-500">{product.model}</div>
                    )}
                    {!product.brand && !product.model && "-"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="font-medium">
                    S/ {product.price.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.stock !== null ? (
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.stock > 10
                          ? "bg-green-100 text-green-800"
                          : product.stock > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock} unidades
                    </span>
                  ) : (
                    <span className="text-gray-400">Sin definir</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.measure}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.sku || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(product)}
                        className="text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded transition-colors"
                      >
                        Editar
                      </button>
                    )}
                    {onDelete && product.productId && (
                      <button
                        onClick={() => handleDelete(product.productId!)}
                        disabled={loadingDelete === product.productId}
                        className="text-red-600 hover:text-red-900 px-2 py-1 rounded transition-colors disabled:opacity-50"
                      >
                        {loadingDelete === product.productId
                          ? "Eliminando..."
                          : "Eliminar"}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Mostrando {(meta.currentPage - 1) * meta.itemsPerPage + 1} -{" "}
              {Math.min(meta.currentPage * meta.itemsPerPage, meta.totalItems)}{" "}
              de {meta.totalItems} productos
            </span>

            <select
              value={meta.itemsPerPage}
              onChange={(e) => onLimitChange?.(Number(e.target.value))}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value={5}>5 por página</option>
              <option value={10}>10 por página</option>
              <option value={20}>20 por página</option>
              <option value={50}>50 por página</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onPageChange?.(meta.currentPage - 1)}
              disabled={meta.currentPage <= 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Anterior
            </button>

            <span className="px-3 py-1 text-sm border border-gray-300 rounded bg-blue-50">
              Página {meta.currentPage} de {meta.totalPages}
            </span>

            <button
              onClick={() => onPageChange?.(meta.currentPage + 1)}
              disabled={meta.currentPage >= meta.totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
