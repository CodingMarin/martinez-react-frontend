import { useState } from "react";
import { toast } from "sonner";
import { useProformas, useCreateProforma } from "@hooks/useProformas";
import { ProformaForm } from "@components/forms/ProformaForm";
import type { CreateProformaDto } from "@/types/proforma";
import { ProformaTable } from "@/components/tables/ProformaTable";

export const ProformasPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [showForm, setShowForm] = useState(false);

  const { data, isLoading, error } = useProformas({ page, limit });
  const createProforma = useCreateProforma();

  const handleCreateProforma = async (data: CreateProformaDto) => {
    try {
      await createProforma.mutateAsync(data);
      setShowForm(false);
      toast.success("Proforma creada exitosamente");
    } catch (error) {
      console.error("Error creating proforma:", error);
      toast.error("Error al crear la proforma");
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
          <h3 className="font-semibold mb-2">Error al cargar proformas</h3>
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
          <h1 className="text-3xl font-bold text-gray-900">Proformas</h1>
          <p className="text-gray-600 mt-1">
            Gestiona las proformas de tus clientes
          </p>
          {data && (
            <p className="text-sm text-gray-500 mt-1">
              {data.items.length} proformas en total
            </p>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-sm hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            + Nueva Proforma
          </button>
        </div>
      </div>

      {/* Form Modal/Section */}
      {showForm && (
        <div className="mb-6 bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Nueva Proforma</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          <ProformaForm
            onSubmit={handleCreateProforma}
            loading={createProforma.isPending}
          />
        </div>
      )}

      {/* Lista de Proformas */}
      <div className="hidden md:block">
        {data && (
          <ProformaTable
            data={data}
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
