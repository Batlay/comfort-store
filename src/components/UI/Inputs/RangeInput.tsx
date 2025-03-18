import { ComponentPropsWithoutRef, useState } from "react";
import { formatPriceInUSD } from "../../../utils/format";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label: string,
  name: string,
}

function RangeInput({label, name}: InputProps) {
  const step = 1000;
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState(maxPrice);
  

  return ( 
    <div className={`flex flex-col gap-y-3`}>
      <label htmlFor={name} className="capitalize text-sm flex justify-between">
        <span>{label}</span>
        <span>{formatPriceInUSD(selectedPrice)}</span>
      </label>
      <input 
        name={name} 
        type='range' 
        min={0}
        max={maxPrice}
        value={selectedPrice}
        className={`range range-primary range-sm`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedPrice(Number(e.target.value))}
        step={step}
      />
    </div>
  );
}

export default RangeInput;