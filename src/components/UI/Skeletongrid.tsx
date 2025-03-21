function SkeletonGrid({list=false}: {list?: boolean}) {
  const skeletonClassname = `skeleton shadow-sm  ${list ? 'w-full h-[150px]' : 'w-[356px] h-[208px]'}`

  return ( 
    <div className={`grid mt-12 ${list ? 'grid-cols-1 gap-y-8' : 'grid-cols-3 gap-[6px]'}`}>
      <div className={skeletonClassname}></div>
      <div className={skeletonClassname}></div>
      {list || 
        <div className={skeletonClassname}></div>}
    </div>
  );
}

export default SkeletonGrid;