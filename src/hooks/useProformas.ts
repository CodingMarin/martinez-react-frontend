import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { proformaService } from "@services/proformaService";
import type { CreateProformaDto } from "@/types/proforma";
import type { PaginationParams } from "@/types/paginated";
import { toast } from "sonner";

export const useProformas = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ["proformas", params],
    queryFn: () => proformaService.getAll(params).then((res) => res.data),
  });
};

export const useProforma = (id: string) => {
  return useQuery({
    queryKey: ["proformas", id],
    queryFn: () => proformaService.getById(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useCreateProforma = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProformaDto) =>
      proformaService.create(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proformas"] });
    },
  });
};

export const useGeneratePDF = () => {
  return useMutation({
    mutationFn: (proformaId: string) => proformaService.generatePDF(proformaId),
    onSuccess: () => {
      toast.success("PDF generado y descargado correctamente");
    },
    onError: (error) => {
      const message = error.message || "Error al generar el PDF";
      toast.error(message);
    },
  });
};

export const usePreviewHTML = () => {
  return useMutation({
    mutationFn: (proformaId: string) => proformaService.previewHTML(proformaId),
    onError: (error) => {
      const message = error.message || "Error al generar la vista previa";
      toast.error(message);
    },
  });
};
