import { StackItem } from "./stack.type";

export interface baseItemCard {
  id: string;
  title: string;
  description: string;
  stack: StackItem[];
};
