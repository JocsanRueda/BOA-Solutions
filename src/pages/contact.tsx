import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EMAIL, PHONE_NUMBER } from "@/constants/const";
import { contactSchema } from "@/schemas/contact.schema";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  AtSign,
  CheckCheck,
  Clipboard,
  Earth,
  Send,
  Smartphone,
  X
} from "lucide-react";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";

export function ContactPage() {

  // Load EmailJS IDs from Vite environment variables.
  // Create a local `.env` with these keys (see .env.example).
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },

  });

  const { theme } = useTheme();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = useCallback((text: string, field: string) => {
    void navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => { setCopiedField(null); }, 2000);
  }, []);

  const onSubmit = useCallback((values: z.infer<typeof contactSchema>) => {

    const templateParams = {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
    };

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )
      .then(() => {

        toast("Mensaje enviado con éxito", {
          icon: <CheckCheck />,
        })

        form.reset();
      })
       
      .catch((error) => {

        toast("Error al enviar el mensaje: " + error.message, {
          icon: <X />,
        })

      });
  }, [form]);

  return (
    <div className="flex items-center justify-center px-5 sm:px-4 py-10 md:my-32 w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
      >
        <div className="space-y-10 mx-1.5 my-8 text-gray-900 dark:text-white">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-center md:text-left">Contáctanos</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg text-center md:text-left">
              Estamos listos para transformar tu negocio. Hablemos sobre tu próximo proyecto.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <AtSign className="text-blue-500 w-6 h-6" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 select-none">Email</p>
                <div className="flex items-center space-x-2">
                  <p>{EMAIL}</p>
                  <div className="relative flex items-center">
                    <Clipboard
                      className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-200 hover:bg-blue-500 p-0.5 hover:text-white dark:hover:text-black rounded transition-colors"
                      onClick={() => { handleCopy(EMAIL, "email"); }}
                    />
                    <AnimatePresence>
                      {copiedField === "email" && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: -20 }}
                          exit={{ opacity: 0, y: 0 }}
                          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none font-medium select-none"
                        >
                          ¡Copiado!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Smartphone className="text-blue-500 w-6 h-6" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 select-none">Teléfono</p>
                <div className="flex items-center space-x-2">
                  <p><span className="font-semibold select-none">+504</span> {PHONE_NUMBER}</p>
                  <div className="relative flex items-center">
                    <Clipboard
                      className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-200 hover:bg-blue-500 p-0.5 hover:text-white dark:hover:text-black rounded transition-colors"
                      onClick={() => { handleCopy(PHONE_NUMBER, "phone"); }}
                    />
                    <AnimatePresence>
                      {copiedField === "phone" && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: -20 }}
                          exit={{ opacity: 0, y: 0 }}
                          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none font-medium select-none"
                        >
                          ¡Copiado!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Earth className="text-green-500 w-6 h-6" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ubicación</p>
                <p className="text-gray-800 dark:text-white">Tegucigalpa, Honduras</p>
              </div>
            </div>
          </div>

        </div>

        <div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="bg-white/40 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/10 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white font-semibold">Envía un Mensaje</CardTitle>
                </CardHeader>
                <CardContent>

                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem className="my-3">
                      <FormLabel className='block text-sm text-gray-600 dark:text-gray-400 '>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem className="my-3">
                      <FormLabel className='block text-sm text-gray-600 dark:text-gray-400 '>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="@email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem className="my-3">
                      <FormLabel className='block text-sm text-gray-600 dark:text-gray-400 '>Asunto</FormLabel>
                      <FormControl>
                        <Input placeholder="Motivo de contacto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem className="my-3 ">
                      <FormLabel className='block text-sm text-gray-600 dark:text-gray-400 '>Mensaje</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Escribe tu mensaje aquí" {...field} className="min-h-37.5" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button
                    type="submit"
                    className="w-full bg-teal-600 text-white dark:bg-teal-500/10 dark:text-teal-400 border border-teal-600 dark:border-teal-500/50 hover:bg-teal-700 hover:text-white dark:hover:bg-teal-500 dark:hover:text-black transition-all font-semibold rounded-xl py-6 mt-4"
                    name="submit-button"
                  >
                    <Send className="mr-2 w-5 h-5" /> Enviar Mensaje
                  </Button>
                  <Toaster theme={theme} position="top-center" richColors closeButton />
                </CardContent>
              </Card>
            </form>
          </FormProvider>

        </div>
      </motion.div>

    </div>
  );
}

export default ContactPage;