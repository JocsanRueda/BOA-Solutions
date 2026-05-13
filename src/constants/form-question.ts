import { FormFieldConfig } from "@/types/form.type";

export const form_questions: FormFieldConfig[] = [
  // Paso 1: Datos de Contacto
  { id: "business_name", label: "Nombre de su negocio", type: "text", placeholder: "Ej. Mi Tienda S.A.", required: true },
  { id: "contact_name", label: "Nombre de la persona de contacto", type: "text", placeholder: "Ej. Juan Pérez", required: true },
  { id: "phone", label: "Número de WhatsApp o teléfono", type: "text", placeholder: "+504 0000-0000", required: true },
  { id: "email", label: "Correo Electrónico (Opcional)", type: "email", placeholder: "hola@ejemplo.com", required: false },
  
  // Paso 2: Perfil del Negocio
  { id: "business_type", label: "¿Qué tipo de negocio tienes?", type: "select", options: [
    { label: "Tienda de ropa o accesorios", value: "ropa" },
    { label: "Restaurante / Comida rápida", value: "restaurante" },
    { label: "Clínica Médica / Laboratorio", value: "clinica_medica" },
    { label: "Clínica Odontológica", value: "clinica_odontologica" },
    { label: "Salón de belleza / Barbería / Spa", value: "belleza_spa" },
    { label: "Agencia Inmobiliaria / Bienes Raíces", value: "inmobiliaria" },
    { label: "Autolote / Venta de Vehículos", value: "autolote" },
    { label: "Repuestos Automotrices", value: "repuestos" },
    { label: "Tecnología / Computadoras", value: "tecnologia" },
    { label: "Logística / Transporte", value: "logistica" },
    { label: "Servicios profesionales (Legales, Contables, etc.)", value: "servicios_profesionales" },
    { label: "Venta de productos en general", value: "productos_general" },
    { label: "Otros", value: "otros" },
  ], required: true },
  { id: "main_channel", label: "¿En qué red o medio recibes más mensajes?", type: "select", options: [
    { label: "WhatsApp", value: "whatsapp" },
    { label: "Instagram", value: "instagram" },
    { label: "Facebook Messenger", value: "messenger" },
    { label: "Página Web", value: "web" },
    { label: "Varios de los anteriores", value: "varios" },
  ], required: true },
  { id: "message_volume", label: "¿Aproximadamente cuántos mensajes de clientes recibes al día?", type: "select", options: [
    { label: "Menos de 10", value: "bajo" },
    { label: "Entre 10 y 50", value: "medio" },
    { label: "Más de 50", value: "alto" },
  ], required: true },
  { id: "frequent_questions", label: "¿Qué preguntas te hacen más tus clientes? (Puedes elegir varias)", type: "multiselect", options: [
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
  { id: "comments", label: "¿Hay algún otro detalle que quieras comentarnos? (Opcional)", type: "textarea", placeholder: "Ej. Actualmente usamos WhatsApp normal, pero perdemos mucho tiempo respondiendo las mismas preguntas...", required: false }
];