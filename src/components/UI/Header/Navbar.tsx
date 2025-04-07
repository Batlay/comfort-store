import { BsCart2 } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher";
import { useAppSelector } from "../../../features/hooks";
import { useEffect, useRef, useState } from "react";
import { MdOutlineMenuOpen } from "react-icons/md";

function NavList() {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  
  const isActiveNavLink = ({isActive}: {isActive: boolean}) => {
    return `px-4 py-2 rounded-lg text-sm transition-all duration-300 ease-in-out 
      ${isActive 
        ? ' bg-slate-950 text-stone-50 hover:bg-slate-800' 
        : 'hover:bg-slate-200 hover:text-stone-950'}`
  }

  return (
    <>
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
      {isAuth &&
      <>
        <NavLink to='/checkout' className={isActiveNavLink}>
          Checkout
        </NavLink>
        <NavLink to='/orders' className={isActiveNavLink}>
          Orders
        </NavLink>
      </>
      }
    </>
  )
}

function Navbar() {
  const cartItems = useAppSelector((state) => state.cart)
  const [isShowed, setIsShowed] = useState(false)

  const totalItems = cartItems.reduce((acc, product) => {
    return acc += product.amount!
  }, 0)

  function hideDroplist() {
    setIsShowed(false)
  }

  const ref = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target) && event.target.localName !== 'button') {
      setIsShowed(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside
      );
    };
  });

  return ( 
    <>
      <nav className="w-full bg-base-300 h-[68px] flex justify-center">
        <section className="w-[320px] sm:w-[500px] md:w-[680px] lg:w-[920px] xl:w-[1080px] flex justify-between">
          <div className="lg:hidden self-center">
            <button className="btn btn-ghost lg:hidden" onClick={() => setIsShowed(!isShowed)}>
              <MdOutlineMenuOpen className="pointer-events-none" size={24}/>
            </button>
            <div className={`bg-base-100 p-4 absolute z-100 w-[200px] transition-all border-1 rounded-md duration-100 ease-in-out ${isShowed ? '' : 'hidden'}`} ref={ref}>
              <ul className="flex flex-col z-10" onClick={hideDroplist}>
                <NavList />
              </ul>
            </div>
          </div>
          <NavLink to='/' className="hidden lg:block self-center">
            <img src="/android-chrome-512x512.png" className="w-[40px] h-[40px]"/> 
          </NavLink>
          <div className="hidden flex gap-2 lg:flex items-center">
            <NavList />
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