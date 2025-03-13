const Heading = ({ title, className }: { title: string,className?:string  }) => {
  return <h2 className={`text-2xl font-semibold text-slate-800 dark:text-slate-50 ${className}`}>{title}</h2>;
};

export default Heading;

