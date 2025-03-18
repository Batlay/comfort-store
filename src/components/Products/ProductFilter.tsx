import { URLSearchParamsInit, useSearchParams } from "react-router";
import { formatPriceInUSD } from "../../utils/format";
import Input from "../UI/Inputs/Input";
import SelectInput from "../UI/Inputs/SelectInput";
import RangeInput from "../UI/Inputs/RangeInput";
import CheckboxInput from "../UI/Inputs/CheckboxInput";

const categoryOptions = ['all', 'Tables', 'Chairs', 'Kids', 'Sofas', 'Beds']
const companyOptions = ['all', 'Modenza', 'Luxora', 'Artifex', 'Comfora', 'Homestead']
const sortOptions = ['a-z', 'z-a', 'high', 'low']

interface ProductFilterProps {
 filterProducts: (url: string) => void
}

function ProductFilter({filterProducts}: ProductFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  function getFormData(formData: FormData) {
    const data: Object = Object.fromEntries(formData);
    let paramsObject: URLSearchParamsInit = {}

    for (const [key, value] of Object.entries(data)) {
      searchParams.set(key, value)
      paramsObject = {...paramsObject, [key]: value as string}
    }
    setSearchParams(paramsObject)

    // Если мы фильтровали продукты со значением shipping=true,
    // и убрали галочку => надо убрать shipping из searchParams
    if (!paramsObject.hasOwnProperty('shipping')) {
      searchParams.delete('shipping')
    }
    searchParams.delete('page')
    
    const queryParams = []

    for (const [key, value] of searchParams.entries()) {
      queryParams.push(`${key}=${value}`)
    }

    filterProducts(queryParams.join('&'))
  }

  return ( 
    <section className="mt-20 w-full bg-base-300 px-8 py-4 rounded-xl">
      <form className="grid grid-cols-4 gap-x-4 gap-y-8 items-center" action={getFormData}>
        <Input label="search product" name='search'/>

        <SelectInput label='select category' name='category' options={categoryOptions}/>
        <SelectInput label='select company' name='company' options={companyOptions}/>
        <SelectInput label='sort by' name='order' options={sortOptions}/>

        <div>
          <RangeInput label="select price" name='price'/>
          <div className="flex justify-between font-medium text-xs mt-1">
            <p>0</p>
            <p>Max: {formatPriceInUSD(100000)}</p>
          </div>
        </div>

        <CheckboxInput label="free shipping"  name='shipping'/>

        <button className="uppercase btn btn-primary rounded-xl btn-sm" type="submit">select</button>
        <button className="uppercase font-medium btn btn-secondary rounded-xl btn-sm">reset</button>
      </form>
    </section>
  );
}

export default ProductFilter;