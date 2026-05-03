import { ColorType } from "@/common/types/color.type";
import { StackItem } from "@/common/types/stack.type";
import { IconType } from "react-icons/lib";

export interface experienceDetailType {
  icon?: IconType;
  lineColor: ColorType;
  id: string;
  company: string;
  position: string;
  period: string;
  contractType: string;
  location: string;
  shortDescription: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  linkedinUrl: string;
  companyUrl: string;
  stack: StackItem[];
  contactCompany?:string;
}