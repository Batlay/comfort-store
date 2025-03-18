import { ComponentPropsWithoutRef, useState } from "react";

interface CheckboxInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string,
  name: string,
}

function CheckboxInput({label, name}: CheckboxInputProps) {
  const [checked, setChecked] = useState(false)

  function toggleCheckbox() {
    setChecked(prevChecked => !prevChecked)
  }

  return ( 
    <div className={`flex flex-col gap-y-3 items-center`}>
      <label htmlFor={name} className="capitalize text-sm">{label}</label>
      <input name={name} type='checkbox' checked={checked} onChange={toggleCheckbox} className={`checkbox checkbox-sm checkbox-primary`} />
    </div>
  );
}

export default CheckboxInput;