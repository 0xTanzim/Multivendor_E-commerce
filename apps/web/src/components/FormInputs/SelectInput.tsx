/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";

interface SelectInputProps {
  label: string;
  name: string;
  setValue: (name: any, value: any) => void;
  className?: string;
  options?: { id: number | string; title: string }[];
  hasMultiple?: boolean;
}

export default function SelectInput({
  label,
  name,
  setValue,
  className = "sm:col-span-2",
  options = [],
  hasMultiple = false,
}: SelectInputProps) {
  const selectOptions = options.map((option) => ({
    value: option.id,
    label: option.title,
  }));

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
          options={selectOptions}
          isMulti={hasMultiple}
          onChange={handleChange}
          className="text-slate-900"
          classNamePrefix="react-select"
          
        />
      </div>
    </div>
  );
}

