export enum UnitMeasure {
  // Peso
  KILOGRAMO = "KILOGRAMO",
  GRAMO = "GRAMO",
  LIBRA = "LIBRA",
  TONELADA = "TONELADA",

  // Longitud
  METRO = "METRO",
  CENTIMETRO = "CENTIMETRO",
  MILIMETRO = "MILIMETRO",
  PULGADA = "PULGADA",
  PIE = "PIE",

  // Área
  METRO_CUADRADO = "METRO_CUADRADO",
  CENTIMETRO_CUADRADO = "CENTIMETRO_CUADRADO",
  PIE_CUADRADO = "PIE_CUADRADO",

  // Volumen
  LITRO = "LITRO",
  MILILITRO = "MILILITRO",
  GALON = "GALON",
  METRO_CUBICO = "METRO_CUBICO",

  // Unidades
  PIEZA = "PIEZA",
  PAR = "PAR",
  DOCENA = "DOCENA",
  UNIDAD = "UNIDAD",

  // Ferretería
  SACO = "SACO",
  BALDE = "BALDE",
  CAJA = "CAJA",
  ROLLO = "ROLLO",
  HOJA = "HOJA",
  TUBO = "TUBO",
  BARRA = "BARRA",
  TABLA = "TABLA",

  // Especiales
  PAQUETE = "PAQUETE",
  CONJUNTO = "CONJUNTO",
  KIT = "KIT",
}

export interface Product {
  productId?: string;
  name: string;
  brand?: string;
  model?: string | null;
  description?: string;
  price: number;
  stock: number | null;
  sku?: string | null;
  measure: UnitMeasure;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  brand?: string;
  model?: string;
  description?: string;
  price: number;
  stock: number;
  sku?: string;
  unitMeasure: UnitMeasure;
  categoryId?: string;
}
