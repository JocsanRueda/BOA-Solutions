import { StackItem } from "./stack.type";

export type baseItemCard  = {
  id: string;
  title: string;
  description: string;
  stack: StackItem[]; 
};
