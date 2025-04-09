import { NavLink } from "react-router";
import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';
import ImageSlider from "./ImageSlider";

const images = [hero1, hero2, hero3, hero4]

function Hero() {
  return ( 
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
      <div className="col-span-1 py-10 text-center lg:text-left">
        <h1 className="text-3xl sm:text-6xl font-medium">We are changing the way people shop</h1>
        <p className="text-lg mt-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit veniam dolor deleniti possimus odio obcaecati saepe delectus recusandae.
        </p>
        <NavLink to={'/products'} className="mt-8 btn btn-primary p-5">
          Our products
        </NavLink>
      </div>
      <div className="col-span-1 bg-blue-900 p-2 md:p-4 lg:p-6 h-[500px] rounded-lg ">
        <ImageSlider imageUrls={images}/>
      </div>
    </section>
  );
}

export default Hero;