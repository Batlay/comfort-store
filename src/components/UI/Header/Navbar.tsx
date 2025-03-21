import { BsCart2 } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "../../ThemeSwitcher";
import { useAppSelector } from "../../../features/hooks";

function Navbar() {
  const cartItems = useAppSelector((state) => state.cart.cart)

  const totalItems = cartItems.reduce((acc, product) => {
    return acc += product.amount!
  }, 0)

  const isActiveNavLink = ({isActive}: {isActive: boolean}) => {
    return `px-4 py-2 rounded-lg text-sm transition-all duration-300 ease-in-out 
      ${isActive ? ' bg-slate-950 text-stone-50 hover:bg-slate-800' : 'hover:bg-slate-200 hover:text-stone-950'}`
  }

  return ( 
    <>
      <nav className="w-full bg-base-300 h-[68px] flex justify-center">
        <section className="w-[1080px] flex justify-between items-center">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <NavLink to='/' className="hidden lg:block">
            <button className="text-3xl btn btn-primary text-white ">C</button>
          </NavLink>
          <div className="hidden flex gap-2 lg:flex items-center">
            <NavLink to='/' className={isActiveNavLink}>
              Home
            </NavLink>
            <NavLink to='/about' className={isActiveNavLink}>
              About
            </NavLink>
            <NavLink to='/products' className={isActiveNavLink}>
              Products
            </NavLink>
            <NavLink to='/cart' className={isActiveNavLink}>
              Cart
            </NavLink>
          </div>
          <div className="flex justify-between gap-5 items-center">
            <ThemeSwitcher />
            <NavLink to='/cart'>
              <div className="indicator">
                <span className="indicator-item badge badge-sm badge-primary rounded-full font-normal text-sm">{totalItems}</span>
                <BsCart2 size={24} />
              </div>
            </NavLink>
          </div>
        </section>
      </nav>
    </>
  );
}

export default Navbar;