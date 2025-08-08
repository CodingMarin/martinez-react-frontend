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

  generatePDF: async (proformaId: string): Promise<void> => {
    const response = await api.get(`/reports/proforma/${proformaId}/pdf`, {
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
    });

    const blob = new Blob([response.data], { type: "application/pdf" });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `proforma-${proformaId.padStart(4, "0")}.pdf`
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  },

  previewHTML: async (proformaId: string): Promise<string> => {
    const response = await api.get(`/reports/proforma/${proformaId}/preview`, {
      headers: {
        Accept: "text/html",
      },
    });
    return response.data;
  },
};
