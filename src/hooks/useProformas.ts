import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { proformaService } from "@services/proformaService";
import type { CreateProformaDto } from "@/types/proforma";
import type { PaginationParams } from "@/types/paginated";

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
