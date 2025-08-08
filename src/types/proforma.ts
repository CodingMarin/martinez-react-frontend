import type { UnitMeasure } from "./product";

export interface CreateProformaDto {
  client: string;
  address: string;
  items: ProformaItemDto[];
}

export interface ProformaItemDto {
  productId: string;
  quantity: number;
}

// Get Proformas Response
export interface ProformaResponse {
  id: string;
  numberProforma: string;
  dateProforma: string;
  client: string;
  address: string;
  total: number;
  items: ProformaItemResponse[];
}

export interface ProformaItemResponse {
  product: string;
  description: number;
  unitPrice: number;
  unitMeasure: UnitMeasure;
}

// Created Proforma Response
export interface ProformaCreatedResponse {
  id: string;
  numberProforma: string;
  dateProforma: string;
  client: string;
  address: string;
  total: number;
  items: ProformaItemCreatedResponse[];
}

export interface ProformaItemCreatedResponse {
  product: string;
  quantity: number;
  unitAmount: number;
  subtotal: number;
}
