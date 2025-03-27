import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import Input from "../components/UI/Inputs/Input"
import { NavLink, useNavigate } from "react-router"
import { ILoginUser } from "../shared/interfaces/users.interface"
import { useAppDispatch, useAppSelector } from "../features/hooks"
import { loginUser } from "../features/auth/authActions"
import { useEffect } from "react"
import Loading from "../components/UI/Loading"

function LoginPage() {
  const methods = useForm<ILoginUser>()
  const {handleSubmit, formState: { errors }} = methods

  const {error, isAuth, loading} = useAppSelector(state => state.auth)
  
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])


  const onSubmit: SubmitHandler<ILoginUser> = (data) => {
    dispatch(loginUser(data))
  }

  const loginAsGuest = () => {
    dispatch(loginUser({email: 'test@test.com', password: 'secret'}))
  }

  if (loading) {
    return <Loading />
  } 
  
  return ( 
      <div className="w-120 bg-base-200 py-8 px-15 shadow-lg mx-auto my-20">
        <h4 className="capitalize text-center text-3xl font-medium mb-10">login</h4>
        <FormProvider {...methods}>
          <form className="flex flex-col gap-y-4 w-full"  onSubmit={handleSubmit(onSubmit)}>
            <Input 
              label="email"  
              name='email' 
              options={{ pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Please provide valid email address'}, required: 'Email is required'}}
              className="text-lg input-md w-full"
            />
            {errors.email && <p className="text-red-500 font-medium">{errors.email.message}</p>}

            <Input 
              label="password"  
              name='password' 
              type="password"
              options={{ minLength: {value: 6, message: 'Password must be at least 6 characters '}, maxLength: {value: 12, message: 'Password must be under 8 characters'}, required: 'Password is required' }}
              className="text-lg input-md w-full"
            />
            {errors.password && <p className="text-red-500 font-medium">{errors.password.message}</p>}

            <button className="uppercase btn btn-primary btn-md rounded-xl mt-5" type="submit">
              login
            </button>
            <button className="uppercase btn bg-violet-400 btn-md rounded-xl " type="submit" onClick={loginAsGuest}>
              guest user
            </button>
            <p className="text-center">Not a member yet? <NavLink to='/register' className='text-primary'>Register</NavLink></p>
            {error && <p className="text-center">{error}</p>}
          </form>
        </FormProvider>
      </div>
  );
}

export default LoginPage;