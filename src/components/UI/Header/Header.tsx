import { NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import { logout } from "../../../features/auth/authSlice";
import { clearCart } from "../../../features/cart/cartSlice";

function Header() {
  const {isAuth, userInfo} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const exit = () => {
    dispatch(clearCart())

    localStorage.removeItem('userToken')
    localStorage.removeItem('userInfo')

    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="bg-blue-950 py-2 text-neutral-content">
      <div className="w-[1080px] mx-auto flex justify-center sm:justify-end">
        <div className="flex gap-x-6 justify-center items-center">
        {isAuth
        ? 
          <>
          <p>Hello, {userInfo?.username || 'guest'}</p>
          <button className="link link-hover " onClick={exit}>Logout</button>
          </>
        :
          <>
            <NavLink className="link link-hover text-xs sm:text-sm" to="/login">Sign in / Guest</NavLink>
            <NavLink className="link link-hover text-xs sm:text-sm" to="/register">Create Account</NavLink>
          </>}
        </div>
      </div>
    </header>
  );
}

export default Header;