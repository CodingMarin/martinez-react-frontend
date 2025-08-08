import { DataTable } from "@components/ui/DataTable";
import type { ProformaResponse } from "@/types/proforma";
import { type ColumnDef } from "@tanstack/react-table";
import { Eye, File } from "lucide-react";
import type { PaginatedResponse } from "@/types/paginated";

interface ProductTableProps {
  data: PaginatedResponse<ProformaResponse>;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}
export const ProformaTable = ({
  data,
  onPageChange,
  onLimitChange,
}: ProductTableProps) => {
  const columns: ColumnDef<ProformaResponse>[] = [
    {
      accessorKey: "numberProforma",
      header: "Proforma",
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">
          Nº {row.original.numberProforma}
        </div>
      ),
    },
    {
      accessorKey: "dateProforma",
      header: "Fecha",
      cell: ({ row }) => {
        return (
          <div className="font-medium text-gray-900">
            {row.original.dateProforma}
          </div>
        );
      },
    },
    {
      accessorKey: "client",
      header: "Cliente",
      cell: ({ row }) => {
        return (
          <div className="font-medium text-blue-500 truncate w-20">
            {row.original.client}
          </div>
        );
      },
    },
    {
      accessorKey: "address",
      header: "Dirección",
      cell: ({ row }) => {
        return (
          <div className="font-medium text-orange-500 truncate w-20">
            {row.original.address}
          </div>
        );
      },
    },
    {
      id: "products",
      header: "Productos",
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            ({row.original.items.length}) Productos
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: () => (
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {}}
            className="text-indigo-600 flex items-center gap-2 hover:text-indigo-900 px-2 py-1 rounded transition-colors text-sm font-medium"
          >
            <Eye className="w-5 h-5" />
            Detalles
          </button>
          <button
            onClick={() => {}}
            className="text-blue-600 flex items-center gap-2 hover:text-blue-900 px-2 py-1 rounded transition-colors text-sm font-medium"
          >
            <File className="w-5 h-5" />
            Generar PDF
          </button>
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
