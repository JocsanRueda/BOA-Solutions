import { useState } from "react";
import { DynamicForm } from "@/components/dynamic-form";
import { FormFieldConfig } from "@/types/form.type";
import { toast } from "sonner";
import { m, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const sampleFields: FormFieldConfig[] = [
  // Paso 1: Datos de Contacto
  { id: "business_name", label: "Nombre de su negocio", type: "text", placeholder: "Ej. Mi Tienda S.A.", required: true },
  { id: "contact_name", label: "Nombre de la persona de contacto", type: "text", placeholder: "Ej. Juan Pérez", required: true },
  { id: "phone", label: "Número de WhatsApp o teléfono", type: "text", placeholder: "+1 234 567 8900", required: true },
  { id: "email", label: "Correo Electrónico (Opcional)", type: "email", placeholder: "hola@ejemplo.com", required: false },
  
  // Paso 2: Perfil del Negocio
  { id: "business_type", label: "¿Qué tipo de negocio tienes?", type: "select", options: [
    { label: "Tienda de ropa", value: "ropa" },
    { label: "Restaurante", value: "restaurante" },
    { label: "Clínica", value: "clinica" },
    { label: "Salón de belleza", value: "belleza" },
    { label: "Venta de productos", value: "productos" },
    { label: "Servicios profesionales", value: "servicios" },
    { label: "Otros", value: "otros" },
  ], required: true },
  { id: "main_channel", label: "¿En qué red o medio recibes más mensajes?", type: "select", options: [
    { label: "WhatsApp", value: "whatsapp" },
    { label: "Instagram", value: "instagram" },
    { label: "Facebook Messenger", value: "messenger" },
    { label: "Página Web", value: "web" },
    { label: "Varios de los anteriores", value: "varios" },
  ], required: true },
  { id: "frequent_questions", label: "¿Qué preguntas te hacen más tus clientes?", type: "select", options: [
    { label: "Precios de productos o servicios", value: "precios" },
    { label: "Disponibilidad de productos", value: "disponibilidad" },
    { label: "Catálogo", value: "catalogo" },
    { label: "Horarios de atención", value: "horarios" },
    { label: "Ubicación del negocio", value: "ubicacion" },
    { label: "Cómo comprar o hacer pedidos", value: "comprar" },
    { label: "Agendar citas", value: "citas" },
    { label: "Otras consultas", value: "otras" },
  ], required: true },

  // Paso 3: Objetivos de Automatización
  { id: "has_catalog", label: "¿Tienes un catálogo digital de tus productos/servicios?", type: "select", options: [
    { label: "Sí", value: "si" },
    { label: "No", value: "no" },
    { label: "Estoy trabajando en uno", value: "en_proceso" },
  ], required: true },
  { id: "automation_goal", label: "¿Cuál es tu principal objetivo al automatizar?", type: "select", options: [
    { label: "Responder a clientes más rápido", value: "rapidez" },
    { label: "No tener que contestar mensajes todo el día", value: "tiempo" },
    { label: "Mejorar las ventas", value: "ventas" },
    { label: "Dar información automática", value: "informacion" },
    { label: "Organizar mejor los pedidos o consultas", value: "organizacion" },
    { label: "Mejorar la atención al cliente", value: "atencion" },
  ], required: true },
  { id: "try_system", label: "¿Te gustaría probar un sistema de respuesta automática?", type: "select", options: [
    { label: "Sí", value: "si" },
    { label: "No", value: "no" },
    { label: "Tal vez", value: "tal_vez" },
  ], required: true },

  // Paso 4: Información Extra
  { id: "comments", label: "¿Hay algún otro detalle que quieras comentarnos? (Opcional)", type: "textarea", placeholder: "Escribe aquí cualquier necesidad específica o duda que tengas sobre datos o automatización...", required: false }
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
