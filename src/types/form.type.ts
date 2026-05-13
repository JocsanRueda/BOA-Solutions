export type FieldType = "text" | "email" | "textarea" | "select" | "multiselect";

export interface FieldOption {
  label: string;
  value: string;
}

export interface FormFieldConfig {
  id: string; 
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[]; 
}