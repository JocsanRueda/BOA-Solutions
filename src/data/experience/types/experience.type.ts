import { ColorType } from "@/common/types/color.type";
import { StackItem } from "@/common/types/stack.type";
import { IconType } from "react-icons/lib";

export interface experienceType {
  icon?: IconType;
  lineColor: ColorType;
  id: string;
  company: string;  
  position: string;
  period: string;
  shortDescription: string;
  stack: StackItem[];
 
}