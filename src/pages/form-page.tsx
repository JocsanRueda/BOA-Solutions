import { useState } from "react";
import { DynamicForm } from "@/components/dynamic-form";
import { FormFieldConfig } from "@/types/form.type";
import { toast } from "sonner";
import { m, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const sampleFields: FormFieldConfig[] = [
  // Page 1: Personal Info
  { id: "name", label: "Nombre Completo", type: "text", placeholder: "Ej. Juan Pérez", required: true },
  { id: "email", label: "Correo Electrónico", type: "email", placeholder: "juan@ejemplo.com", required: true },
  { id: "phone", label: "Teléfono", type: "text", placeholder: "+1 234 567 8900", required: true },
  { id: "country", label: "País / Ciudad", type: "text", placeholder: "Ej. México, CDMX", required: false },
  
  // Page 2: Project Details
  { id: "company", label: "Nombre de la Empresa", type: "text", placeholder: "Tu Empresa S.A.", required: false },
  { id: "service", label: "Servicio de Interés", type: "select", options: [
    { label: "Desarrollo Web", value: "web" },
    { label: "Aplicación Móvil", value: "mobile" },
    { label: "Diseño UI/UX", value: "design" },
    { label: "Consultoría IT", value: "consulting" },
    { label: "Otro", value: "other" },
  ], required: true },
  { id: "budget", label: "Presupuesto Estimado", type: "select", options: [
    { label: "Menos de $1,000 USD", value: "tier1" },
    { label: "$1,000 - $5,000 USD", value: "tier2" },
    { label: "$5,000 - $10,000 USD", value: "tier3" },
    { label: "Más de $10,000 USD", value: "tier4" },
  ], required: true },
  { id: "timeline", label: "Tiempo Estimado (Deadline)", type: "select", options: [
    { label: "Lo antes posible", value: "asap" },
    { label: "1 a 3 meses", value: "short" },
    { label: "3 a 6 meses", value: "medium" },
    { label: "Sin prisa", value: "flexible" },
  ], required: true },
  
  // Page 3: Additional Details
  { id: "message", label: "Cuéntanos más sobre tu proyecto", type: "textarea", placeholder: "Describe los objetivos principales y qué esperas lograr...", required: true },
  { id: "reference", label: "¿Cómo nos conociste?", type: "text", placeholder: "Ej. Google, LinkedIn, Referencia...", required: false }
];

export default function FormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (data: Record<string, string>) => {
    setIsSubmitting(true);
    setIsError(false);
    
    try {
      const response = await fetch("/api/contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as { success?: boolean; error?: string };

      if (response.ok && result.success) {
        toast.success("¡Formulario enviado con éxito!", {
          description: "Nuestro equipo revisará tu solicitud y te contactará pronto.",
        });
        setIsSuccess(true);
      } else {
        throw new Error(result.error || "Error al procesar la solicitud en el servidor.");
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setErrorMessage(error.message || "Hubo un problema de conexión. Inténtalo de nuevo.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8 relative w-full overflow-hidden">
      {/* Background glowing effects for the form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-30"></div>

      <m.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl w-full bg-background/40 backdrop-blur-2xl p-8 sm:p-10 rounded-2xl border border-white/10 shadow-2xl relative z-20 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!isSuccess && !isError ? (
            <m.div 
              key="form-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
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

              <div className="mt-10">
                <DynamicForm 
                  fields={sampleFields} 
                  onSubmitData={handleSubmit} 
                  isSubmitting={isSubmitting} 
                  submitText="Enviar Solicitud"
                />
              </div>
            </m.div>
          ) : isSuccess ? (
            <m.div 
              key="success-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex flex-col items-center justify-center py-12 space-y-8"
            >
              <div className="relative">
                <m.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full"
                ></m.div>
                <m.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-28 h-28 text-green-500 relative z-10 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                </m.div>
              </div>
              
              <div className="text-center space-y-3">
                <m.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-foreground"
                >
                  ¡Solicitud Recibida!
                </m.h2>
                <m.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-muted-foreground"
                >
                  Hemos recibido tu información correctamente. Nuestro equipo revisará los detalles y te contactaremos a la brevedad.
                </m.p>
              </div>

              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="mt-4 px-8 h-12 rounded-full border-primary/50 hover:bg-primary/10 transition-colors"
                >
                  Enviar otra solicitud
                </Button>
              </m.div>
            </m.div>
          ) : (
            <m.div 
              key="error-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex flex-col items-center justify-center py-12 space-y-8"
            >
              <div className="relative">
                <m.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full"
                ></m.div>
                <m.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  <XCircle className="w-28 h-28 text-red-500 relative z-10 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                </m.div>
              </div>
              
              <div className="text-center space-y-3">
                <m.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-foreground"
                >
                  Algo salió mal
                </m.h2>
                <m.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-muted-foreground"
                >
                  {errorMessage}
                </m.p>
              </div>

              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="mt-4 px-8 h-12 rounded-full border-red-500/50 hover:bg-red-500/10 text-red-500 transition-colors"
                >
                  Intentar de nuevo
                </Button>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </div>
  );
}
