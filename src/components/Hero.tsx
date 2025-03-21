import { NavLink } from "react-router";

function Hero() {
  return ( 
    <section className="flex justify-between items-center gap-10 h-[28rem]">
      <div className="basis-1/2 py-10">
        <h1 className="text-6xl font-medium">We are changing the way people shop</h1>
        <p className="text-lg mt-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit veniam dolor deleniti possimus odio obcaecati saepe delectus recusandae.</p>
        <button className="mt-8 btn btn-primary">
          <NavLink to={'/products'}>Our products</NavLink>
        </button>
      </div>
      <div className="basis-1/2 bg-blue-950 w-full h-[448px]">
      
      </div>
    </section>
  );
}

export default Hero;