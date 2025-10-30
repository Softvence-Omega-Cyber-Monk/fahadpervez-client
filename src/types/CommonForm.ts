import { ZodSchema, ZodTypeAny } from "zod";

export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
  defaultValue?: string | number | undefined ;
}

export interface Props<T extends Record<string, unknown>> {
  fields: FieldConfig[];
  schema: ZodSchema<T> | ZodTypeAny;
  onSubmit: (data: T) => void;
}

export interface CommonFormRef {
  submit: () => Promise<void>;
}