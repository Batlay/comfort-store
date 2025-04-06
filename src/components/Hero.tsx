import { NavLink } from "react-router";
import SimpleImageSlider from "react-simple-image-slider";
import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';
import useWindowDimensions from "../services/helpers/windowDimensions";

const images = [
  { url: hero1 },
  { url: hero2 },
  { url: hero3 },
  { url: hero4 },
];


function Hero() {
  const { width } = useWindowDimensions();

  return ( 
    <section className="flex flex-col lg:flex-row justify-between items-center gap-10">
      <div className="basis-1/2 py-10 text-center lg:text-left">
        <h1 className="text-3xl sm:text-6xl font-medium">We are changing the way people shop</h1>
        <p className="text-lg mt-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit veniam dolor deleniti possimus odio obcaecati saepe delectus recusandae.</p>
        <button className="mt-8 btn btn-primary">
          <NavLink to={'/products'}>Our products</NavLink>
        </button>
      </div>
      <div className="basis-1/2 bg-blue-900 h-[448px] p-2 sm:p-[30px] flex rounded-lg">
        <SimpleImageSlider
          width={width >=640 ? 400 : 340}
          height={500}
          images={images}
          showBullets={false}
          showNavs={true}
        />
      </div>
    </section>
  );
}

export default Hero;