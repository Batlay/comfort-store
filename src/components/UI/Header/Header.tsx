import { NavLink } from "react-router";

function Header() {
  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="w-[1080px] mx-auto flex justify-center sm:justify-end">
        <div className="flex gap-x-6 justify-center items-center">
          <NavLink className="link link-hover text-xs sm:text-sm" to="/login">Sign in / Guest</NavLink>
          <NavLink className="link link-hover text-xs sm:text-sm" to="/register">Create Account</NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;