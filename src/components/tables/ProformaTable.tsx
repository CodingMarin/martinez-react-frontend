import { DataTable } from "@components/ui/DataTable";
import type { ProformaResponse } from "@/types/proforma";
import { type ColumnDef } from "@tanstack/react-table";
import { FileDown, FileText, Loader2 } from "lucide-react";
import type { PaginatedResponse } from "@/types/paginated";
import { useGeneratePDF, usePreviewHTML } from "@/hooks/useProformas";
import { useState } from "react";

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
  const generatePDF = useGeneratePDF();
  const previewMutation = usePreviewHTML();

  const [loadingPDF, setLoadingPDF] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState<string | null>(null);

  const handleGeneratePDF = async (proformaId: string) => {
    setLoadingPDF(proformaId);
    try {
      await generatePDF.mutateAsync(proformaId);
    } finally {
      setLoadingPDF(null);
    }
  };

  const handlePreview = async (proformaId: string) => {
    setLoadingPreview(proformaId);
    try {
      const html = await previewMutation.mutateAsync(proformaId);
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        newWindow.document.write(html);
        newWindow.document.close();
      }
    } catch (error) {
      console.error("Error generating preview:", error);
    } finally {
      setLoadingPreview(null);
    }
  };

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
      cell: ({ row }) => {
        const isGeneratingPDF = loadingPDF === row.original.id;
        const isGeneratingPreview = loadingPreview === row.original.id;

        return (
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => handlePreview(row.original.id)}
              disabled={isGeneratingPreview}
              className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm font-medium"
              title="Vista previa del PDF"
            >
              {isGeneratingPreview ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Cargando...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Preview
                </>
              )}
            </button>

            <button
              onClick={() => handleGeneratePDF(row.original.id)}
              disabled={isGeneratingPDF}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              title="Generar y descargar PDF"
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4" />
                  Generar PDF
                </>
              )}
            </button>
          </div>
        );
      },
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
