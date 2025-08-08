import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import {
  UnitMeasure,
  type CreateProductDto,
  type Product,
} from "@/types/product";
import { getUnitMeasureDescription } from "@/utils/measure";

const productSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  brand: z.string().optional(),
  model: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive("Precio debe ser positivo"),
  stock: z.number().min(0, "Stock no puede ser negativo"),
  sku: z.string().optional(),
  unitMeasure: z.enum(UnitMeasure),
  categoryId: z.string().optional(),
});

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (data: CreateProductDto) => void;
  loading?: boolean;
}

export const ProductForm = ({
  initialData,
  onSubmit,
  loading,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateProductDto>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      brand: "",
      model: "",
      description: "",
      price: 0,
      stock: 0,
      sku: "",
      unitMeasure: UnitMeasure.UNIDAD,
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("brand", initialData.brand || "");
      setValue("model", initialData.model || "");
      setValue("description", initialData.description || "");
      setValue("price", initialData.price);
      setValue("stock", initialData.stock || 0);
      setValue("sku", initialData.sku || "");
      setValue("unitMeasure", initialData.measure);
    } else {
      reset({
        name: "",
        brand: "",
        model: "",
        description: "",
        price: 0,
        stock: 0,
        sku: "",
        unitMeasure: UnitMeasure.UNIDAD,
      });
    }
  }, [initialData, setValue, reset]);

  const handleFormSubmit = (data: CreateProductDto) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="transition-all duration-200 delay-[250ms] ease-out starting:open:opacity-0 starting:open:translate-y-2 open:opacity-100 open:translate-y-0">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre *
          </label>
          <input
            {...register("name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Nombre del producto"
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="transition-all duration-200 delay-[300ms] ease-out starting:open:opacity-0 starting:open:translate-y-2 open:opacity-100 open:translate-y-0">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marca
          </label>
          <input
            {...register("brand")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Marca del producto"
          />
          {errors.brand && (
            <span className="text-red-500 text-sm mt-1">
              {errors.brand.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="transition-all duration-200 delay-[350ms] ease-out starting:open:opacity-0 starting:open:translate-y-2 open:opacity-100 open:translate-y-0">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modelo
          </label>
          <input
            {...register("model")}
            className="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Modelo del producto"
          />
          {errors.model && (
            <span className="text-red-500 text-sm mt-1">
              {errors.model.message}
            </span>
          )}
        </div>

        <div className="transition-all duration-200 delay-[400ms] ease-out starting:open:opacity-0 starting:open:translate-y-2 open:opacity-100 open:translate-y-0">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SKU
          </label>
          <input
            {...register("sku")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Código único del producto"
          />
          {errors.sku && (
            <span className="text-red-500 text-sm mt-1">
              {errors.sku.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="transition-all duration-200 delay-[450ms] ease-out starting:open:opacity-0 starting:open:translate-y-2 open:opacity-100 open:translate-y-0">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Precio *
          </label>
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="0.00"
          />
          {errors.price && (
            <span className="text-red-500 text-sm mt-1">
              {errors.price.message}
            </span>
          )}
        </div>

        <div className="transition-all duration-200 delay-[500ms] ease-out starting:open:opacity-0 starting:open:translate-y-2 open:opacity-100 open:translate-y-0">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock *
          </label>
          <input
            {...register("stock", { valueAsNumber: true })}
            type="number"
            min="0"
            className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
          {errors.stock && (
            <span className="text-red-500 text-sm mt-1">
              {errors.stock.message}
            </span>
          )}
        </div>
      </div>

      <div className="transition-all duration-200 delay-[550ms] ease-out starting:open:opacity-0 starting:open:translate-y-2 open:opacity-100 open:translate-y-0">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Unidad de medida *
        </label>
        <select
          {...register("unitMeasure")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          {Object.values(UnitMeasure).map((unit) => (
            <option key={unit} value={unit}>
              {getUnitMeasureDescription(unit)}
            </option>
          ))}
        </select>
        {errors.unitMeasure && (
          <span className="text-red-500 text-sm mt-1">
            {errors.unitMeasure.message}
          </span>
        )}
      </div>

      <div className="transition-all duration-200 delay-[650ms] ease-out starting:open:opacity-0 starting:open:translate-y-2 open:opacity-100 open:translate-y-0">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Descripción detallada del producto"
        />
        {errors.description && (
          <span className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          className="transition-all duration-200 delay-[700ms] ease-out starting:open:opacity-0 starting:open:translate-y-2 starting:open:scale-95 open:opacity-100 open:translate-y-0 open:scale-100 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:scale-105 active:scale-95"
          onClick={() => reset()}
          disabled={loading}
        >
          Limpiar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="transition-all duration-200 delay-[750ms] ease-out starting:open:opacity-0 starting:open:translate-y-2 starting:open:scale-95 open:opacity-100 open:translate-y-0 open:scale-100 px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {loading
            ? initialData
              ? "Actualizando..."
              : "Creando..."
            : initialData
            ? "Actualizar Producto"
            : "Crear Producto"}
        </button>
      </div>
    </form>
  );
};
