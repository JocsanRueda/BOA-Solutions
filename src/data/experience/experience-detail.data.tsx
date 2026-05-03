import { 
  Layout, 
  Server
} from "lucide-react";
import { FaAws, FaWindows } from "react-icons/fa";
import { SiNestjs, SiTypescript, SiJest, SiSwagger,SiJira, SiNodedotjs, SiAnydesk } from "react-icons/si";
import { BsMicrosoftTeams } from "react-icons/bs";
import { VscVscode } from "react-icons/vsc";
import { experienceDetailType } from "./types/experience-detail.type";

export const data: experienceDetailType[]  = [
  {
    icon:Layout,
    lineColor:"green",
    id: "guababit",
    company: "Guababit",
    position: "Desarrollador Junior Backend ",
    period: "Octubre/2024 - Marzo/2025",
    contractType: "Contrato de prácticas",
    location: "Remoto",
    shortDescription:"Participé en el desarrollo backend de aplicaciones web con NestJS y AWS, implementando arquitecturas serverless, asegurando la seguridad y eficiencia de las APIs, y aplicando pruebas unitarias con Jest en un entorno ágil basado en Scrum.",
    description: "Participé en el desarrollo backend de aplicaciones web utilizando NestJS, AWS Lambda, DynamoDB y API Gateway, implementando arquitecturas serverless para mejorar el rendimiento y la escalabilidad. Diseñé y mantuve APIs seguras y eficientes, integrando servicios en la nube como S3 y Cognito para almacenamiento y autenticación, optimizando la gestión de datos y usuarios. Además, trabajé en la implementación de pruebas unitarias con Jest, mejorando la calidad del código y reduciendo errores en producción. Colaboré dentro de un entorno ágil con Scrum, participando en revisiones de código, reuniones diarias y sprints, asegurando entregas iterativas y eficientes",
    responsibilities: [
      "Desarrollo de Construcción y Mantenimiento de Servicios Backend: Creación de controladores, servicios y repositorios (repo.ts) en NestJS, siguiendo principios de arquitectura limpia y buenas prácticas de desarrollo",
      "Definición de Esquemas: Diseño y estructuración de modelos de datos para DynamoDB, asegurando una gestión eficiente de la información.",
      "Pruebas Unitarias: Implementación de pruebas con Jest para garantizar la calidad del código y prevenir errores en producción",
      "Optimización de Implementaciones: Investigación y aplicación de soluciones eficientes para mejorar el rendimiento, escalabilidad y seguridad de las APIs",
      "Integración con AWS: Uso de Lambda, API Gateway, S3 y Cognito para desarrollar soluciones serverless robustas y escalables.",
      "Trabajo en Metodología Ágil: Participación en revisiones de código, reuniones diarias y sprints dentro de un entorno Scrum",
      "Revisión de Código: Evaluación y mejora de código en pull requests, asegurando el cumplimiento de estándares y buenas prácticas."
    ],
    achievements: [
      "Implementación exitosa de un servicio clave en un proyecto, asegurando su correcto funcionamiento y escalabilidad en un entorno serverless con NestJS y AWS Lambda",
      "Investigación e implementación efectiva de un sistema de autenticación, integrando AWS Cognito para mejorar la seguridad y gestión de usuarios",
      "Desarrollo e integración exitosa de ImportJobs para AWS Cognito, facilitando la importación y administración eficiente de usuarios en la plataforma",
      "Desarrollo e implementación de una solución de paginación eficiente para consultas en DynamoDB."
    ],
    linkedinUrl: "https://www.linkedin.com/company/guababit/",
    companyUrl: "https://guababit.com/",

    stack:[
      {
        icon:SiNestjs,
        name:"NestJS",
        color:"bg-red-600"
      },{
        icon: SiNodedotjs,
        name:"node",
        color:"bg-green-600"
      },
      {
        icon:SiTypescript,
        name:"TypeScript",
        color:"bg-blue-600"
      },
      {
        icon:SiJest,
        name:"Jest",
        color:"bg-green-600"
                   
      },
      {
        icon:SiSwagger,
        name:"Swagger",
        color:"bg-green-600"
                   
      },
      {
        icon: FaAws,
        name:"AWS",
        color:"bg-yellow-600"
                   
      },{
        icon: BsMicrosoftTeams,
        name:"Teams",
        color:"bg-purple-600"
      },{
        icon: SiJira,
        name:"Jira",
        color:"bg-blue-600"
      },{
        icon: VscVscode,
        name:"vscode",
        color:"bg-blue-600"
      }
    ]
  } ,
  {
    icon:Server,
    lineColor:"red",
    id: "infatlan",
    company: "Infatlan, Grupo Financiero Atlantida",
    position: "Asistente de soporte tecnico",
    period: "Septiembre 2018 - Septiembre 2018",
    contractType: "Contrato de practicas",
    location: "Tegucigalpa, Francisco Morazan, Honduras",
    shortDescription:"Brindé soporte técnico, realizando mantenimiento, resolución de problemas y diagnóstico de equipos, tanto de forma remota con AnyDesk y TightVNC como en la conexión de redes.",
    description: "Formé parte del equipo de soporte técnico, realizando tareas de mantenimiento y resolución de problemas en computadoras y cajeros automáticos. Utilicé herramientas como AnyDesk y TightVNC para asistir de manera remota, y colaboré en la conexión de redes y diagnóstico de equipos.",
    responsibilities: [
      "Uso de herramientas de soporte remoto: Utilicé AnyDesk y TightVNC para asistir en la resolución de problemas de manera remota.",
      "Configuración de redes: Configuré redes en equipos, asegurando la conectividad y funcionamiento adecuado.",
      "Diagnóstico y reparación de equipos: Realicé diagnósticos y reparaciones de computadoras y cajeros automáticos.",
      "Mantenimiento preventivo: Brindé soporte y mantenimiento preventivo a equipos informáticos.",
      "Identificación de problemas recurrentes: Detecté problemas recurrentes en equipos que requerían reparaciones"
    ],
    achievements: [
      "Identifiqué y solucioné problemas técnicos en computadoras y cajeros automáticos, mejorando la eficiencia del equipo de soporte.",
      "Contribuí a la resolución de incidencias de hardware y software que aumentaron la disponibilidad de equipos clave para la empresa.",
      "Configuré redes en equipos, asegurando su correcto funcionamiento y conectividad."
    ],
    linkedinUrl: "https://www.linkedin.com/company/infatlan/",
    companyUrl: "https://invatlan.hn/acerca-de-invatlan/honduras/infatlan.php",
   
    stack:[
      {
        icon:SiAnydesk,
        name:"AnyDesk",
        color:"bg-orange-900"
      },{
        icon: FaWindows,
        name:"Windows",
        color:"bg-blue-600"
      }
    ]
  }

];