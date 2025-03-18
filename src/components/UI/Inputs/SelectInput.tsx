interface SelectInputProps {
  label: string,
  name: string,
  options: string[]
}

function SelectInput({label, name, options}: SelectInputProps) {
  return ( 
    <div className="flex flex-col gap-y-3">
      <label htmlFor={name} className="capitalize text-sm">{label}</label>
      <select name={name} className="select select-bordered select-primary select-sm cursor-pointer">
        {options.map(option =>
          <option key={option} value={option}>{option}</option>
        )}
      </select>
    </div>
  );
}

export default SelectInput;