import { baseItemCard } from "@/common/types/base-item-card.type";
import { ColorType } from "@/common/types/color.type";
import { IconType } from "react-icons/lib";

export type skillType = baseItemCard & {
  icon: IconType;
  subtitle?: string; 
  lineColor: ColorType; 
  footer?:string,
};