/* eslint-disable @typescript-eslint/no-explicit-any */

type ToggleInputProps = {
  label: string;
  name: string;
  trueTitle: 'Active' | 'Draft' | 'Inactive' | 'Supported' | 'Not Supported';
  falseTitle: 'Active' | 'Draft' | 'Inactive' | 'Supported' | 'Not Supported';
  register: any;
  className?: string;
};

export default function ToggleInput({
  label,
  name,
  trueTitle,
  falseTitle,
  register,
  className = 'sm:col-span-2 flex flex-wrap',
}: ToggleInputProps) {
  return (
    <div className={`${className}`}>
      <div className="w-full sm:w-1/2">
        <h2 className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-50 mb-2">
          {label}
        </h2>
      </div>
      <div className="w-full sm:w-1/2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            {...register(`${name}`)}
            type="checkbox"
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-400 dark:peer-checked:bg-purple-600 "></div>
          <span className="ml-3 text-sm font-medium text-slate-900 dark:text-slate-300">
            {name ? `${trueTitle}` : `${falseTitle}`}
          </span>
        </label>
      </div>
    </div>
  );
}

