import api from "./api";
import type { PaginatedResponse, PaginationParams } from "@/types/paginated";
import type {
  CreateProformaDto,
  ProformaCreatedResponse,
  ProformaResponse,
} from "@/types/proforma";

export const proformaService = {
  getAll: (params?: PaginationParams) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const queryString = searchParams.toString();
    const url = queryString ? `/proforma?${queryString}` : "/proforma";

    return api.get<PaginatedResponse<ProformaResponse>>(url);
  },
  getById: (id: string) => api.get<ProformaResponse>(`/proforma/${id}`),
  create: (data: CreateProformaDto) =>
    api.post<ProformaCreatedResponse>("/proforma", data),
};
