import { routeEnum } from "@/common/enum/route.enum";
import { Contact, House, SquareKanban, Sword, ClipboardList } from "lucide-react";
import { menuItemType } from "./types/menu.type";

export const data : menuItemType[]=[

  {
    name:"Inicio",
    url:routeEnum.HOME,
    icon:House,
  },
  {
    name:"Nosotros",
    url:routeEnum.ABOUT_US,
    icon: SquareKanban,
  },
  {
    name:"Servicios",
    url:routeEnum.SERVICES,
    icon:Sword,
  },
  {
    name:"Contacto",
    url:routeEnum.CONTACT,
    icon:Contact,
  },
  {
    name:"Consultas",
    url:routeEnum.FORM,
    icon:ClipboardList,
  },
]