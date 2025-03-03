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
  defaultValue?: string;
};

export type TextInputProps = BaseInputTypes & {};
export type TextareaInputProps = BaseInputTypes & {};
