function Container({children}: {children:React.ReactNode}) {
  return ( 
   <div className="mx-auto w-[320px] sm:w-[500px] md:w-[680px] lg:w-[920px] xl:w-[1080px]">
      {children}
   </div>
  );
}

export default Container;