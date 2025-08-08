import { create } from "zustand";
import type { ProformaResponse } from "@/types/proforma";

interface ProformaStore {
  proformas: ProformaResponse[];
  loading: boolean;
  error: string | null;

  setProformas: (proformas: ProformaResponse[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProformaStore = create<ProformaStore>((set) => ({
  proformas: [],
  loading: false,
  error: null,

  setProformas: (proformas) => set({ proformas }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
