import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/DataTable";
import type { Product } from "../../types/product";
import type { PaginatedResponse } from "@/types/paginated";

interface ProductTableProps {
  data: PaginatedResponse<Product>;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export const ProductTable = ({
  data,
  onEdit,
  onDelete,
  onPageChange,
  onLimitChange,
}: ProductTableProps) => {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Producto",
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900">{row.original.name}</div>
          {row.original.description && (
            <div className="text-sm text-gray-500">
              {row.original.description}
            </div>
          )}
        </div>
      ),
    },
    {
      id: "brandModel",
      header: "Marca/Modelo",
      cell: ({ row }) => {
        const { brand, model } = row.original;
        return (
          <div>
            {brand && <div className="font-medium">{brand}</div>}
            {model && <div className="text-gray-500">{model}</div>}
            {!brand && !model && "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Precio",
      cell: ({ getValue }) => {
        const price = getValue() as number;
        return <span className="font-medium">S/ {price.toFixed(2)}</span>;
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ getValue }) => {
        const stock = getValue() as number | null;

        if (stock === null) {
          return <span className="text-gray-400">Sin definir</span>;
        }

        return (
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              stock > 10
                ? "bg-green-100 text-green-800"
                : stock > 0
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {stock} unidades
          </span>
        );
      },
    },
    {
      accessorFn: (row) => row.measure?.name,
      id: "measure",
      header: "Unidad",
      cell: ({ getValue }) => (getValue() as string) || "Sin unidad",
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ getValue }) => (getValue() as string) || "-",
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex justify-end space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(row.original)}
              className="text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded transition-colors text-xs font-medium"
            >
              Editar
            </button>
          )}
          {onDelete && row.original.productId && (
            <button
              onClick={() => {
                if (confirm("¿Estás seguro de eliminar este producto?")) {
                  onDelete(row.original.productId!);
                }
              }}
              className="text-red-600 hover:text-red-900 px-2 py-1 rounded transition-colors text-xs font-medium"
            >
              Eliminar
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
      enableSorting={false}
      enableGlobalFilter={true}
      enableFiltering={false}
    />
  );
};
