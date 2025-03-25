'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from 'react-select';

interface SelectInputProps {
  label: string;
  name: string;
  setValue: (name: any, value: any) => void;
  className?: string;
  options?: { id: number | string; title?: string }[];
  hasMultiple?: boolean;
  defaultValue?: string | string[];
}

export default function SelectInput({
  label,
  name,
  setValue,
  className = 'sm:col-span-2',
  options = [],
  defaultValue,
  hasMultiple = false,
}: SelectInputProps) {
  const selectOptions = options.map((option) => ({
    value: option.id,
    label: option.title,
  }));

  const defaultSelected = hasMultiple
    ? selectOptions.filter((opt) =>
        Array.isArray(defaultValue)
          ? defaultValue.includes(opt.value as string)
          : opt.value === defaultValue
      )
    : selectOptions.find((opt) => opt.value === defaultValue);

  const handleChange = (selected: any) => {
    const value = hasMultiple
      ? selected.map((item: any) => item.value)
      : selected?.value;
    setValue(name, value);
  };

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-slate-800 dark:text-slate-100 mb-2"
      >
        {label}
      </label>
      <div className="mt-2">
        <Select
          id={name}
          instanceId={name}
          options={selectOptions}
          isMulti={hasMultiple}
          onChange={handleChange}
          className="text-slate-900"
          classNamePrefix="react-select"
          defaultValue={defaultSelected}
        />
      </div>
    </div>
  );
}
