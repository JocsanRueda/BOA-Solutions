import { experienceType } from "./types/experience.type";
import { data } from "./experience-detail.data";
export const sumaryData: experienceType[]  = data.map((item)=>{
  return {
    icon:item.icon,
    lineColor:item.lineColor,
    id: item.id,
    company: item.company,
    position: item.position,
    period: item.period,
    shortDescription: item.shortDescription,
    stack: item.stack
  } as experienceType
})