import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import Input from "../components/UI/Inputs/Input"
import { NavLink, useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../features/hooks"
import { useEffect } from "react"
import { registerUser } from "../features/auth/api"
import Loading from "../components/UI/Loading"
import { IRegisterUser } from "../shared/interfaces/users.interface"



function RegisterPage() {
  let {error, loading, isAuth} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const methods = useForm<IRegisterUser>()
  const {handleSubmit, formState: { errors }} = methods
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])

  const onSubmit: SubmitHandler<IRegisterUser> = (userData) => {
    dispatch(registerUser(userData))
  }

  if (loading) {
    return <Loading />
  } 
  
  return ( 
    <div className="w-120 bg-base-200 py-8 px-15 shadow-lg mx-auto my-20">
      <h4 className="text-center text-3xl font-medium mb-15">Create account</h4>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-y-4 w-full"  onSubmit={handleSubmit(onSubmit)}>
          <Input 
            label="username"  
            name='username' 
            options={{ required: 'Username is required', minLength: {value: 5, message: 'Username must be at least 5 characters'}}} 
            className="text-lg input-md w-full"
          />
          {errors.username && <p className="text-red-500 font-medium">{errors.username.message}</p>}
          <Input 
            label="email"  
            name="email" 
            options={{ pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Please provide valid email address'}, required: 'Email is required'}}
            className="text-lg input-md w-full"
          />
          {errors.email && <p className="text-red-500 font-medium">{errors.email.message}</p>}

          <Input 
            label="password"  
            name="password" 
            type="password"
            options={{ minLength: {value: 6, message: 'Password must be at least 6 characters '}, maxLength: {value: 12, message: 'Password must be under 8 characters'}, required: 'Password is required' }}
            className="text-lg input-md w-full"
          />
          {errors.password && <p className="text-red-500 font-medium">{errors.password.message}</p>}

          <button className="uppercase btn btn-primary btn-md rounded-xl mt-5" type="submit">register</button>
          <p className="text-center">Already a member? <NavLink to='/login' className='text-primary'>Login</NavLink></p>
        </form>
      </FormProvider>
      {error && <p>Oops... something went wrong</p>}
    </div>
  );
}

export default RegisterPage;