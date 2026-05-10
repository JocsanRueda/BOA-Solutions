import { useState } from "react";
import { DynamicForm } from "@/components/dynamic-form";
import { FormFieldConfig } from "@/types/form.type";
import { toast } from "sonner";
import { m } from "framer-motion";

const sampleFields: FormFieldConfig[] = [
  { id: "name", label: "Nombre Completo", type: "text", placeholder: "Ej. Juan Pérez", required: true },
  { id: "email", label: "Correo Electrónico", type: "email", placeholder: "juan@ejemplo.com", required: true },
  { id: "service", label: "Servicio de Interés", type: "select", options: [
    { label: "Desarrollo Web", value: "web" },
    { label: "Aplicación Móvil", value: "mobile" },
    { label: "Diseño UI/UX", value: "design" },
    { label: "Otro", value: "other" },
  ], required: true },
  { id: "message", label: "Mensaje", type: "textarea", placeholder: "Cuéntanos más sobre tu proyecto...", required: true }
];

export default function FormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data: Record<string, string>) => {
    setIsSubmitting(true);
    // Simulate an API call
    setTimeout(() => {
      console.log("Form data received:", data);
      toast.success("¡Formulario enviado con éxito!", {
        description: "Nuestro equipo revisará tu solicitud y te contactará pronto.",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8 relative z-1 w-full overflow-hidden">
      {/* Background glowing effects for the form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-30"></div>

      <m.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl w-full space-y-8 bg-background/40 backdrop-blur-2xl p-8 sm:p-10 rounded-2xl border border-white/10 shadow-2xl relative z-20"
      >
        <div className="text-center space-y-4">
          <m.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
          >
            Comienza tu Proyecto
          </m.h2>
          <m.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg text-muted-foreground/80 font-light"
          >
            Completa el siguiente formulario y nuestros expertos se pondrán en contacto contigo para hacer realidad tu visión.
          </m.p>
        </div>

        <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10"
        >
          <DynamicForm 
            fields={sampleFields} 
            onSubmitData={handleSubmit} 
            isSubmitting={isSubmitting} 
            submitText="Enviar Solicitud"
          />
        </m.div>
      </m.div>
    </div>
  );
}
