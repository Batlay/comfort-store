function Container({children, className}: {children:React.ReactNode, className?: string}) {
  const classes = `mx-auto w-[1080px] ${className || ''}`

  return ( 
   <div className="flex justify-center min-h-screen">
     <div className={classes}>
        {children}
     </div>
   </div>
  );
}

export default Container;