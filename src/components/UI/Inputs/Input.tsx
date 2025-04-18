import { ComponentPropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label: string,
  type?: string,
  name: string,
  value?: string | number,
  className?: string,
  options?: object,
}

function Input({label, type='text', name, value, className='', options,...props}: InputProps) {
  const {register} = useFormContext()

  return ( 
    <div className={`flex flex-col gap-y-3`}>
      <label htmlFor={name} className="capitalize text-sm">{label} {value}</label>
      <input 
        id={name} 
        {...register(name, options)} 
        type={type} 
        value={value} 
        {...props} 
        className={`input input-bordered input-primary input-sm ${className}`} />
    </div>
  );
}

export default Input;