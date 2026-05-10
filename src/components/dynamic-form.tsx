import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormFieldConfig } from "../types/form.type";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface DynamicFormProps {
  fields: FormFieldConfig[];
  onSubmitData: (data: Record<string, string>) => void;
  isSubmitting: boolean;
  submitText?: string;
}

export function DynamicForm({ fields, onSubmitData, isSubmitting, submitText = "Enviar" }: DynamicFormProps) {
  // 1. Generar el esquema Zod dinámicamente según el array de campos
  const generateSchema = () => {
    const schemaShape: Record<string, z.ZodTypeAny> = {};

    fields.forEach((field) => {
      // start from a Zod string
      let base = z.string({ required_error: "Este campo es requerido" });

      // apply specific type validations first
      if (field.type === "email") {
        base = base.email({ message: "Ingresa un correo válido" });
      }

      // apply required/optional
      const fieldSchema: z.ZodTypeAny = field.required ? base.min(1, { message: "Este campo no puede estar vacío" }) : base.optional();

      schemaShape[field.id] = fieldSchema;
    });

    return z.object(schemaShape);
  };

  const dynamicSchema = generateSchema();
  type DynamicFormValues = z.infer<typeof dynamicSchema>;

  // 2. Inicializar el formulario
  const form = useForm<DynamicFormValues>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.id] = ""; // Inicializa todos los campos en vacío
      return acc;
    }, {}),
  });

  // 3. Renderizado dinámico de los inputs
  const renderInput = (fieldConfig: FormFieldConfig, fieldProps: any) => {
    switch (fieldConfig.type) {
    case "textarea":
      return (
        <Textarea
          placeholder={fieldConfig.placeholder}
          className="resize-none min-h-30"
          {...fieldProps}
        />
      );
    case "select":
      // Usamos un select nativo estilizado con las mismas clases de shadcn/ui para no instalar dependencias extra
      return (
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          {...fieldProps}
        >
          <option value="" disabled>Selecciona una opción</option>
          {fieldConfig.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    case "email":
    case "text":
    default:
      return (
        <Input
          type={fieldConfig.type}
          placeholder={fieldConfig.placeholder}
          {...fieldProps}
        />
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => { void form.handleSubmit(onSubmitData)(e); }} className="space-y-6">
        {fields.map((fieldConfig) => (
          <FormField
            key={fieldConfig.id}
            control={form.control}
            name={fieldConfig.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {fieldConfig.label} {fieldConfig.required && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  {renderInput(fieldConfig, field)}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Procesando..." : submitText}
        </Button>
      </form>
    </Form>
  );
}