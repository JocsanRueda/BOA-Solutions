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
import { m, AnimatePresence, Variants } from "framer-motion";
import { Loader2, Send } from "lucide-react";

interface DynamicFormProps {
  fields: FormFieldConfig[];
  onSubmitData: (data: Record<string, string>) => void;
  isSubmitting: boolean;
  submitText?: string;
}

const formVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

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
    const isError = !!form.formState.errors[fieldConfig.id];

    switch (fieldConfig.type) {
    case "textarea":
      return (
        <Textarea
          placeholder={fieldConfig.placeholder}
          className={`resize-none min-h-32 transition-all duration-300 ${isError ? "focus-visible:ring-destructive/50 border-destructive" : "focus-visible:ring-primary/50"}`}
          {...fieldProps}
        />
      );
    case "select":
      // Usamos un select nativo estilizado con las mismas clases de shadcn/ui
      return (
        <div className="relative">
          <select
            className={`flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow,border-color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm appearance-none ${isError ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50" : "border-input focus-visible:border-ring focus-visible:ring-ring/50"} focus-visible:ring-[3px] dark:bg-input/30 text-foreground`}
            {...fieldProps}
          >
            <option value="" disabled className="text-muted-foreground bg-background">Selecciona una opción</option>
            {fieldConfig.options?.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-background text-foreground">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      );
    case "email":
    case "text":
    default:
      return (
        <Input
          type={fieldConfig.type}
          placeholder={fieldConfig.placeholder}
          className={`transition-all duration-300 ${isError ? "focus-visible:ring-destructive/50 border-destructive" : "focus-visible:ring-primary/50"}`}
          {...fieldProps}
        />
      );
    }
  };

  return (
    <Form {...form}>
      <m.form 
        onSubmit={(e) => { void form.handleSubmit(onSubmitData)(e); }} 
        className="space-y-6"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        {fields.map((fieldConfig) => (
          <m.div key={fieldConfig.id} variants={itemVariants}>
            <FormField
              control={form.control}
              name={fieldConfig.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    {fieldConfig.label} {fieldConfig.required && <span className="text-destructive ml-1">*</span>}
                  </FormLabel>
                  <FormControl>
                    {renderInput(fieldConfig, field)}
                  </FormControl>
                  <AnimatePresence mode="wait">
                    {form.formState.errors[fieldConfig.id] && (
                      <m.div
                        initial={{ opacity: 0, height: 0, y: -5 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormMessage />
                      </m.div>
                    )}
                  </AnimatePresence>
                </FormItem>
              )}
            />
          </m.div>
        ))}

        <m.div variants={itemVariants} className="pt-2">
          <Button 
            type="submit" 
            className="w-full h-11 text-base font-semibold group relative overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]" 
            disabled={isSubmitting}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  {submitText}
                  <Send className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </>
              )}
            </span>
          </Button>
        </m.div>
      </m.form>
    </Form>
  );
}