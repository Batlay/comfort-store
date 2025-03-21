import { ComponentPropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";

interface CheckboxInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string,
  name: string,
}

function CheckboxInput({label, name}: CheckboxInputProps) {
  const {register} = useFormContext()
  
  return ( 
    <div className={`flex flex-col gap-y-3 items-center`}>
      <label htmlFor={name} className="capitalize text-sm">{label}</label>
      <input {...register(name)} type='checkbox' className={`checkbox checkbox-sm checkbox-primary`} />
    </div>
  );
}

export default CheckboxInput;