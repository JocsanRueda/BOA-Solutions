import { Cpu, Bot, Zap, BarChart, ShieldCheck, Globe } from "lucide-react";
import { SiPython, SiOpenai, SiLangchain, SiAutomattic, SiTensorflow,  SiFastapi, SiDocker } from "react-icons/si";
import { FaRobot, FaNetworkWired } from "react-icons/fa";
import { skillType } from "./types/skill.type.data";

export const data: skillType[] = [
  {
    id: "ai-solutions",
    icon: Cpu,
    title: "IA Generativa",
    subtitle: "Texto, Código & Contenido",
    description: "Integramos modelos de lenguaje (LLMs) en tus flujos de trabajo para que tu equipo produzca más con menos esfuerzo.",
    footer: "Desde análisis de documentos hasta generación de reportes automatizados.",
    lineColor: "blue",
    stack: [
      { icon: SiOpenai, name: "OpenAI", color: "bg-green-600" },
      { icon: SiLangchain, name: "LangChain", color: "bg-teal-600" },
      { icon: SiPython, name: "Python", color: "bg-blue-500" },
      { icon: SiTensorflow, name: "TensorFlow", color: "bg-orange-500" }
    ]
  },
  {
    id: "chatbots",
    icon: Bot,
    title: "Chatbots Inteligentes",
    subtitle: "Atención 24/7",
    description: "Asistentes conversacionales que atienden a tus clientes cuando tu equipo no puede, de forma natural y eficiente.",
    footer: "Ideales para atención al cliente, soporte interno o captura de leads.",
    lineColor: "teal",
    stack: [
      { icon: FaRobot, name: "NLP", color: "bg-purple-600" },
      { icon: FaNetworkWired, name: "API Integration", color: "bg-blue-400" },
     
    ]
  },
  {
    id: "automation",
    icon: Zap,
    title: "Automatización de Procesos",
    subtitle: "Ahorra tiempo real",
    description: "Conectamos tus herramientas y automatizamos las tareas repetitivas que consumen el tiempo de tu equipo cada día.",
    footer: "Desde envío de correos hasta sincronización de datos entre plataformas.",
    lineColor: "orange",
    stack: [
      { icon: SiAutomattic, name: "Workflow", color: "bg-blue-600" },
      { icon: SiDocker, name: "Docker", color: "bg-sky-500" },
      { icon: SiFastapi, name: "FastAPI", color: "bg-emerald-500" }
    ]
  },
  {
    id: "data-analytics",
    icon: BarChart,
    title: "Análisis de Datos",
    subtitle: "Decisiones informadas",
    description: "Te ayudamos a entender qué está pasando en tu negocio con dashboards claros y reportes accionables.",
    footer: "Sin jerga técnica — solo información útil para tomar mejores decisiones.",
    lineColor: "purple",
    stack: []
  },
  {
    id: "cybersecurity",
    icon: ShieldCheck,
    title: "Seguridad de Datos",
    subtitle: "Tu información, segura",
    description: "Aplicamos buenas prácticas de seguridad para que tus datos y los de tus clientes siempre estén protegidos.",
    footer: "Porque la confianza de tus clientes es tu activo más valioso.",
    lineColor: "red",
    stack: []
  },
  {
    id: "cloud-infra",
    icon: Globe,
    title: "Infraestructura Cloud",
    subtitle: "Crece sin preocupaciones",
    description: "Desplegamos tus soluciones en la nube para que funcionen de forma estable sin importar cuánto crezca tu negocio.",
    footer: "Empezamos pequeño y escalamos contigo al ritmo que necesitas.",
    lineColor: "green",
    stack: []
  }
];
