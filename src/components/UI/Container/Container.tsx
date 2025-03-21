function Container({children}: {children:React.ReactNode}) {
  return ( 
   <div className="mx-auto w-[1080px]">
      {children}
   </div>
  );
}

export default Container;