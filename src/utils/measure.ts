import { UnitMeasure } from "@/types/product";

export const getUnitMeasureDescription = (unit: UnitMeasure): string => {
  const descriptions: Record<UnitMeasure, string> = {
    [UnitMeasure.KILOGRAMO]: "Kilogramo",
    [UnitMeasure.GRAMO]: "Gramo",
    [UnitMeasure.LIBRA]: "Libra",
    [UnitMeasure.TONELADA]: "Tonelada",
    [UnitMeasure.METRO]: "Metro",
    [UnitMeasure.CENTIMETRO]: "Centímetro",
    [UnitMeasure.MILIMETRO]: "Milímetro",
    [UnitMeasure.PULGADA]: "Pulgada",
    [UnitMeasure.PIE]: "Pie",
    [UnitMeasure.METRO_CUADRADO]: "Metro cuadrado",
    [UnitMeasure.CENTIMETRO_CUADRADO]: "Centímetro cuadrado",
    [UnitMeasure.PIE_CUADRADO]: "Pie cuadrado",
    [UnitMeasure.LITRO]: "Litro",
    [UnitMeasure.MILILITRO]: "Mililitro",
    [UnitMeasure.GALON]: "Galón",
    [UnitMeasure.METRO_CUBICO]: "Metro cúbico",
    [UnitMeasure.PIEZA]: "Pieza",
    [UnitMeasure.PAR]: "Par",
    [UnitMeasure.DOCENA]: "Docena",
    [UnitMeasure.UNIDAD]: "Unidad",
    [UnitMeasure.SACO]: "Saco",
    [UnitMeasure.BALDE]: "Balde",
    [UnitMeasure.CAJA]: "Caja",
    [UnitMeasure.ROLLO]: "Rollo",
    [UnitMeasure.HOJA]: "Hoja",
    [UnitMeasure.TUBO]: "Tubo",
    [UnitMeasure.BARRA]: "Barra",
    [UnitMeasure.TABLA]: "Tabla",
    [UnitMeasure.PAQUETE]: "Paquete",
    [UnitMeasure.CONJUNTO]: "Conjunto",
    [UnitMeasure.KIT]: "Kit",
  };

  return descriptions[unit];
};
