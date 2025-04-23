import { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

interface ImageSliderProps {
  imageUrls: string[]
}

function ImageSlider({imageUrls}: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0)

  function showNextImage() {
    setImageIndex(prevIndex => {
      if (imageUrls.length - 1 === imageIndex) return 0
      return prevIndex + 1
    })
  }

  function showPrevImage() {
    setImageIndex(prevIndex => {
      if (imageIndex === 0) return imageUrls.length - 1
      return prevIndex - 1
    })
  }

  return ( 
    <section aria-label="Image Slider" className="w-full h-full relative">
      <div className="flex w-full h-full overflow-hidden">
        {imageUrls.map((image, index) => 
          <img 
            key={image}
            src={image} 
            className={`object-cover w-full h-full block shrink-0 grow-0 transition-translate duration-800 ease-in-out`}
            style={{ translate: `${-100 * imageIndex}%` }}
            alt={`Image ${index+1}`}
            loading="lazy"
            aria-hidden={imageIndex !== index}
          />
        )}
      </div>
      <button 
        onClick={showPrevImage} 
        className="absolute top-0 bottom-0 left-0 p-10 cursor-pointer hover:bg-[black]/5 transition-all duration-100 ease-in-out" 
        aria-label="prev image"
      >
        <MdArrowBackIos size={28} aria-hidden/>
      </button>
      <button 
        onClick={showNextImage} 
        className="absolute top-0 bottom-0 right-0 p-10 cursor-pointer hover:bg-[black]/5 transition-all duration-100 ease-in-out"
        aria-label="next image"
      >
        <MdArrowForwardIos size={28} aria-hidden/>
      </button>
      <div className="absolute bottom-1 left-[50%] translate-x-[-50%] flex gap-3">
        {imageUrls.map((_, index) => 
          <button
            key={index}
            className="hover:scale-120 transition-scale duration-100 ease-in-out cursor-pointer p-2"
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <FaCircle aria-hidden className="text-[white]"/>
            ) : (
              <FaRegCircle aria-hidden className="text-[white]"/>
            )}
          </button>
        )}
      </div>
    </section>
  );
}

export default ImageSlider;