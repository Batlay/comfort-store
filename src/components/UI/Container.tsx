function Container({children, className}: {children:React.ReactNode, className?: string}) {
  const classes = `h-full container mx-auto w-[1080px] ${className || ''}`

  return ( 
     <div className={classes}>
        {children}
     </div>
  );
}

export default Container;