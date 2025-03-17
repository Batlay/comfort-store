import { useEffect, useState } from "react";
import { FiSun } from "react-icons/fi";
import { IoMoonSharp } from "react-icons/io5";

function ThemeSwitcher() {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    document.querySelector('html')!.setAttribute('data-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return ( 
    <div>
      <button onClick={toggleTheme} className="cursor-pointer transition-all duration-1000 ease-in-out">
        {theme === 'light' 
          ? <IoMoonSharp/>
          : <FiSun />}
      </button>
    </div>
  );
}

export default ThemeSwitcher;