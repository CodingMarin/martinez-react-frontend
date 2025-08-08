import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Trash2, Search, ShoppingCart } from "lucide-react";
import { productService } from "@/services/productService";
import type { CreateProformaDto } from "@/types/proforma";
import type { Product } from "@/types/product";

const proformaSchema = z.object({
  client: z.string().min(1, "El cliente es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Producto requerido"),
        quantity: z.number().min(1, "La cantidad debe ser mayor a 0"),
      })
    )
    .min(1, "Debe agregar al menos un producto"),
});

interface ProformaFormProps {
  onSubmit: (data: CreateProformaDto) => void;
  loading?: boolean;
}

interface ProductSelectorProps {
  onSelectProduct: (product: Product) => void;
  selectedProductIds: string[];
}

const ProductSelector = ({
  onSelectProduct,
  selectedProductIds,
}: ProductSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products", page, 10],
    queryFn: () =>
      productService.getAll({ page, limit: 10 }).then((res) => res.data),
    enabled: showModal,
  });

  const filteredProducts = productsData?.items?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectProduct = (product: Product) => {
    onSelectProduct(product);
    setShowModal(false);
    setSearchTerm("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
      >
        <Search size={16} />
        <span>Buscar Productos</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Seleccionar Producto</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar por nombre o marca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="overflow-y-auto max-h-96">
              {isLoading ? (
                <div className="text-center py-4">Cargando productos...</div>
              ) : (
                <div className="grid gap-2">
                  {filteredProducts?.map((product) => {
                    const isSelected = selectedProductIds.includes(
                      product.productId!
                    );
                    return (
                      <div
                        key={product.productId}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-gray-100 border-gray-400"
                            : "hover:bg-gray-50 border-gray-200"
                        }`}
                        onClick={() =>
                          !isSelected && handleSelectProduct(product)
                        }
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-sm">
                              {product.name}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {product.brand}{" "}
                              {product.model && `- ${product.model}`}
                            </p>
                            <p className="text-sm font-semibold text-green-600">
                              S/ {product.price.toFixed(2)} / {product.measure}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              Stock: {product.stock || 0}
                            </p>
                            {isSelected && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Seleccionado
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600">
                {productsData?.meta && (
                  <>
                    Página {productsData.meta.currentPage} de{" "}
                    {productsData.meta.totalPages}
                  </>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={
                    !productsData?.meta || page >= productsData.meta.totalPages
                  }
                  className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const ProformaForm = ({ onSubmit, loading }: ProformaFormProps) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateProformaDto>({
    resolver: zodResolver(proformaSchema),
    defaultValues: {
      client: "",
      address: "",
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items");

  const handleSelectProduct = (product: Product) => {
    if (!selectedProducts.find((p) => p.productId === product.productId)) {
      setSelectedProducts((prev) => [...prev, product]);
      append({
        productId: product.productId!,
        quantity: 1,
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    const productId = fields[index].productId;
    setSelectedProducts((prev) =>
      prev.filter((p) => p.productId !== productId)
    );
    remove(index);
  };

  const calculateItemTotal = (index: number) => {
    const item = watchedItems[index];
    const product = selectedProducts.find(
      (p) => p.productId === item?.productId
    );
    if (!item || !product) return 0;
    return product.price * item.quantity;
  };

  const handleFormSubmit = (data: CreateProformaDto) => {
    onSubmit(data);
  };

  const selectedProductIds = selectedProducts.map((p) => p.productId!);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Información del Cliente */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Información del Cliente
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cliente *
            </label>
            <input
              {...register("client")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Nombre completo del cliente"
            />
            {errors.client && (
              <p className="mt-1 text-sm text-red-600">
                {errors.client.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección *
            </label>
            <input
              {...register("address")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Dirección completa"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Productos */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Productos</h3>
          <ProductSelector
            onSelectProduct={handleSelectProduct}
            selectedProductIds={selectedProductIds}
          />
        </div>

        {errors.items && (
          <p className="mb-4 text-sm text-red-600">{errors.items.message}</p>
        )}

        {fields.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>No hay productos agregados</p>
            <p className="text-sm">
              Usa el botón "Buscar Productos" para agregar items
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Producto
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Precio Unit.
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Cantidad
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Subtotal
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fields.map((field, index) => {
                  const product = selectedProducts.find(
                    (p) => p.productId === field.productId
                  );
                  return (
                    <tr key={field.id}>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {product?.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {product?.brand}{" "}
                            {product?.model && `- ${product.model}`}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        S/ {product?.price.toFixed(2)} / {product?.measure}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          {...register(`items.${index}.quantity`, {
                            valueAsNumber: true,
                          })}
                          type="number"
                          min="1"
                          step="1"
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        S/ {calculateItemTotal(index).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => {
            reset();
            setSelectedProducts([]);
          }}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
        >
          Limpiar
        </button>
        <button
          type="submit"
          disabled={loading || fields.length === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          {loading ? "Creando..." : "Crear Proforma"}
        </button>
      </div>
    </form>
  );
};
