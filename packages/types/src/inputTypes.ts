type BaseInputTypes = {
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  errors: Record<string, { message?: string }>;
  isRequired?: boolean;
  // type?: string;
  type?: HTMLInputElement["type"];
  className?: string;
  defaultValue?: string |  Object;
};

export type TextInputProps = BaseInputTypes & {
  readOnly?: boolean;
};
export type TextareaInputProps = BaseInputTypes & {};
