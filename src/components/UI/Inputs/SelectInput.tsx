import { useFormContext } from "react-hook-form";

interface SelectInputProps {
  label?: string,
  name: string,
  options: string[],
  className?: string,
}

function SelectInput({label, name, options, className=''}: SelectInputProps) {
  const {register} = useFormContext()

  return ( 
    <div className="flex flex-col gap-y-3">
      {label && <label htmlFor={name} className="capitalize text-sm">{label}</label>}
      <select {...register(name)} className={`select select-bordered select-primary select-sm cursor-pointer ${className}`} id={name}>
        {options.map(option =>
          <option key={option} value={option}>{option}</option>
        )}
      </select>
    </div>
  );
}

export default SelectInput;