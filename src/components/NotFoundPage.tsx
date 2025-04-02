import { NavLink } from "react-router";

function NotFoundPage() {
  return ( 
    <div className="mt-20 flex justify-center">
      <div className="text-center">
        <p className="text-9xl font-bold">404</p>
        <p className="text-3xl">Sorry, we couldn't find this page</p>
        <NavLink to='/' className='block mt-5 text-xl underline'>Back to home</NavLink>
      </div>
    </div>
  );
}

export default NotFoundPage;