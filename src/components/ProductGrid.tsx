import type { PaginatedResponse } from "@/types/paginated";
import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  data: PaginatedResponse<Product>;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export const ProductGrid = ({
  data,
  onEdit,
  onDelete,
  onPageChange,
  onLimitChange,
}: ProductGridProps) => {
  const { items: products, meta } = data;

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No hay productos registrados</p>
        <p className="text-sm mt-2">
          Crea tu primer producto usando el botón "Nuevo Producto"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.productId || `product-${index}`} // ✅ Fallback para key
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Info y selector de límite */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Mostrando {(meta.currentPage - 1) * meta.itemsPerPage + 1} -{" "}
              {Math.min(meta.currentPage * meta.itemsPerPage, meta.totalItems)}{" "}
              de {meta.totalItems} productos
            </span>

            {onLimitChange && (
              <select
                value={meta.itemsPerPage}
                onChange={(e) => onLimitChange(Number(e.target.value))}
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={8}>8 por página</option>
                <option value={12}>12 por página</option>
                <option value={16}>16 por página</option>
                <option value={24}>24 por página</option>
              </select>
            )}
          </div>

          {/* Controles de navegación */}
          {onPageChange && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onPageChange(meta.currentPage - 1)}
                disabled={meta.currentPage <= 1}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                ← Anterior
              </button>

              <div className="flex items-center space-x-1">
                {/* Páginas */}
                {renderPaginationNumbers(
                  meta.currentPage,
                  meta.totalPages,
                  onPageChange
                )}
              </div>

              <button
                onClick={() => onPageChange(meta.currentPage + 1)}
                disabled={meta.currentPage >= meta.totalPages}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function renderPaginationNumbers(
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
) {
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages)
    startPage = Math.max(1, endPage - maxVisiblePages + 1);

  if (startPage > 1) {
    pages.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        1
      </button>
    );

    if (startPage > 2) {
      pages.push(
        <span key="ellipsis1" className="px-2 text-gray-400">
          ...
        </span>
      );
    }
  }

  // Páginas visibles
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
          i === currentPage
            ? "bg-blue-500 text-white border-blue-500"
            : "border-gray-300 hover:bg-gray-50"
        }`}
      >
        {i}
      </button>
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push(
        <span key="ellipsis2" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    pages.push(
      <button
        key={totalPages}
        onClick={() => onPageChange(totalPages)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        {totalPages}
      </button>
    );
  }

  return pages;
}
