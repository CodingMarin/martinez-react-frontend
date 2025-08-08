import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          {product.brand && (
            <p className="text-sm text-gray-600">{product.brand}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-600">
            S/ {product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            {product.measure?.name || "Sin unidad"}
          </p>
        </div>
      </div>

      {product.description && (
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.stock > 10
                ? "bg-green-100 text-green-800"
                : product.stock > 0
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            Stock: {product.stock}
          </div>
          {product.sku && (
            <span className="text-xs text-gray-500">SKU: {product.sku}</span>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        {onEdit && (
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Editar
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(product.productId)}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
