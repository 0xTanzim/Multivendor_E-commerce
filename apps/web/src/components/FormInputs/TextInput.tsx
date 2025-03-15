"use client";

import { TextInputProps } from "@repo/types";

export default function TextInput({
  label,
  name,
  register,
  errors,
  isRequired = true,
  type = "text",
  className = "sm:col-span-2",
  defaultValue = "",
  readOnly = false,
}: TextInputProps) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-slate-800 dark:text-slate-100 mb-2 "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          {...register(`${name}`, { required: isRequired })}
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          autoComplete={name}
          className="block w-full rounded-md border-0 py-2 text-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-emerald-700 sm:text-sm sm:leading-6 dark:bg-transparent dark:text-slate-100 dark:placeholder-slate-400 dark:border-slate-700 dark:focus:ring-slate-500"
          placeholder={`Type the ${label.toLowerCase()}`}
          readOnly={readOnly}
          
        />
        {errors[`${name}`] && (
          <span className="text-sm text-red-600 ">{label} is required</span>
        )}
      </div>
    </div>
  );
}

