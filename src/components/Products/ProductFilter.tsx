import { useSearchParams } from "react-router";
import { formatPriceInUSD } from "../../utils/formatting";
import Input from "../UI/Inputs/Input";
import SelectInput from "../UI/Inputs/SelectInput";
import RangeInput from "../UI/Inputs/RangeInput";
import CheckboxInput from "../UI/Inputs/CheckboxInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const categoryOptions = ['all', 'Tables', 'Chairs', 'Kids', 'Sofas', 'Beds']
const companyOptions = ['all', 'Modenza', 'Luxora', 'Artifex', 'Comfora', 'Homestead']
const sortOptions = ['a-z', 'z-a', 'high', 'low']

interface IFormInput {
  search: string,
  category: string,
  company: string,
  order: string,
  price: string,
  shipping: boolean
}

function ProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const methods = useForm<IFormInput>()
  const {register, handleSubmit, reset} = methods

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    let paramsObject = new URLSearchParams()

    for (const [key, value] of Object.entries(data)) {
      if (key === 'shipping' && !value) {
        continue
      }
      searchParams.set(key, value)
      paramsObject = {...paramsObject, [key]: value as string}
    }

    setSearchParams(paramsObject)

    // Если мы фильтровали продукты со значением shipping=true,
    // и убрали чекбокс => надо убрать shipping из searchParams
    if (!paramsObject.hasOwnProperty('shipping')) {
      searchParams.delete('shipping')
    }

    searchParams.delete('page')
  }
  

  return ( 
    <div className="w-full">
      <div className=" bg-base-300 px-8 py-4 rounded-xl">
        <FormProvider {...methods}>
          <form className="grid grid-cols-4 gap-x-4 gap-y-8 items-center"  onSubmit={handleSubmit(onSubmit)}>
            <Input label="search product"  {...register('search')}/>

            <SelectInput label='select category'  name='category' options={categoryOptions}/>
            <SelectInput label='select company'  name='company' options={companyOptions}/>
            <SelectInput label='sort by'  name='order' options={sortOptions}/>

            <div>
              <RangeInput label="select price"  name='price'/>
              <div className="flex justify-between font-medium text-xs mt-1">
                <p>0</p>
                <p>Max: {formatPriceInUSD(100000)}</p>
              </div>
            </div>

            <CheckboxInput label="free shipping" name='shipping'/>

            <button className="uppercase btn btn-primary rounded-xl btn-sm" type="submit">select</button>
            <button className="uppercase font-medium btn btn-secondary rounded-xl btn-sm"  onClick={() => reset({
              search: '',
              category: 'all',
              company: 'all',
              order: 'a-z',
              price: '100000',
              shipping: false,
            })}>reset</button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default ProductFilter;