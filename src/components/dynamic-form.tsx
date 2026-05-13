import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
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
import { Loader2, Send, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { useState } from "react";

interface DynamicFormProps {
  fields: FormFieldConfig[];
  onSubmitData: (data: Record<string, any>) => void;
  isSubmitting: boolean;
  submitText?: string;
  fieldsPerPage?: number;
}

const formVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function DynamicForm({ fields, onSubmitData, isSubmitting, submitText = "Enviar", fieldsPerPage = 4 }: DynamicFormProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(fields.length / fieldsPerPage);

  // 1. Generar el esquema Zod dinámicamente según el array de campos
  const generateSchema = () => {
    const schemaShape: Record<string, z.ZodTypeAny> = {};

    fields.forEach((field) => {
      if (field.type === "multiselect") {
        let arrayBase = z.array(z.string());
        if (field.required) {
          arrayBase = arrayBase.min(1, { message: "Selecciona al menos una opción" });
        }
        schemaShape[field.id] = arrayBase;
        return;
      }

      let base = z.string({ required_error: "Este campo es requerido" });

      if (field.type === "email") {
        base = base.email({ message: "Ingresa un correo válido" });
      }

      let fieldSchema: z.ZodTypeAny;
      if (field.required) {
        fieldSchema = base.min(1, { message: "Este campo no puede estar vacío" });
      } else {
        if (field.type === "email") {
          fieldSchema = z.union([z.literal(""), base]).optional();
        } else {
          fieldSchema = base.optional();
        }
      }

      schemaShape[field.id] = fieldSchema;
    });

    return z.object(schemaShape);
  };

  const dynamicSchema = generateSchema();
  type DynamicFormValues = z.infer<typeof dynamicSchema>;

  // 2. Inicializar el formulario
  const form = useForm<DynamicFormValues>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: fields.reduce<Record<string, any>>((acc, field) => {
      acc[field.id] = field.type === "multiselect" ? [] : "";
      return acc;
    }, {}),
  });

  const currentFields = fields.slice(currentPage * fieldsPerPage, (currentPage + 1) * fieldsPerPage);

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    const fieldsToValidate = currentFields.map(f => f.id);
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage(prev => prev - 1);
  };

  // 3. Renderizado dinámico de los inputs
  const renderInput = (fieldConfig: FormFieldConfig, fieldProps: ControllerRenderProps<Record<string, any>, string>) => {
    const isError = !!form.formState.errors[fieldConfig.id];

    switch (fieldConfig.type) {
    case "multiselect": {
      const val = fieldProps.value as unknown;
      const selectedValues: string[] = Array.isArray(val) ? (val as string[]) : [];
      
      const toggleOption = (optValue: string) => {
        if (selectedValues.includes(optValue)) {
          fieldProps.onChange(selectedValues.filter((v) => v !== optValue));
        } else {
          fieldProps.onChange([...selectedValues, optValue]);
        }
      };

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {fieldConfig.options?.map((opt) => {
            const isSelected = selectedValues.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleOption(opt.value)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all duration-200 text-left ${
                  isSelected 
                    ? "border-primary bg-primary/10 text-primary font-medium shadow-sm" 
                    : "border-input bg-background hover:bg-secondary/50 text-foreground"
                } ${isError ? "border-destructive/50" : ""}`}
              >
                <span className="mr-2 leading-tight">{opt.label}</span>
                <div className={`shrink-0 w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                  isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
      );
    }
    case "textarea":
      return (
        <Textarea
          placeholder={fieldConfig.placeholder}
          className={`resize-none min-h-32 transition-all duration-300 ${isError ? "focus-visible:ring-destructive/50 border-destructive" : "focus-visible:ring-primary/50"}`}
          {...fieldProps}
        />
      );
    case "select":
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
      <form 
        onSubmit={(e) => { void form.handleSubmit(onSubmitData)(e); }} 
        className="space-y-6 overflow-hidden px-0.5"
      >
        <AnimatePresence mode="wait">
          <m.div 
            key={currentPage}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            {currentFields.map((fieldConfig, index) => (
              <m.div key={`${fieldConfig.id}-${index}`} variants={itemVariants}>
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
          </m.div>
        </AnimatePresence>

        <m.div variants={itemVariants} className="pt-4 flex gap-3">
          {currentPage > 0 && (
            <Button 
              type="button" 
              variant="outline"
              onClick={handlePrev}
              className="flex-1 h-11 text-base font-semibold transition-all hover:bg-secondary" 
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Atrás
            </Button>
          )}

          {currentPage < totalPages - 1 ? (
            <Button 
              type="button" 
              onClick={handleNext}
              className="flex-1 h-11 text-base font-semibold transition-all" 
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              className="flex-1 h-11 text-base font-semibold group relative overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]" 
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    {submitText}
                    <Send className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </Button>
          )}
        </m.div>

        {totalPages > 1 && (
          <m.div variants={itemVariants} className="flex justify-center gap-2 pt-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentPage ? "w-8 bg-primary" : "w-2 bg-primary/20"}`}
              />
            ))}
          </m.div>
        )}
      </form>
    </Form>
  );
}