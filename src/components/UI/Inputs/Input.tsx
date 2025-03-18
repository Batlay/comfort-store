import { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label: string,
  type?: string,
  name: string,
  value?: string | number,
  className?: string,
}

function Input({label, type='text', name, value, className='input input-bordered input-sm input-primary', ...props}: InputProps) {
  return ( 
    <div className={`flex flex-col gap-y-3`}>
      <label htmlFor={name} className="capitalize text-sm">{label} {value}</label>
      <input name={name} type={type} value={value} {...props} className={`${className}`} />
    </div>
  );
}

export default Input;