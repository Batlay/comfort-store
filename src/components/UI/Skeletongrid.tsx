function SkeletonGrid({list=false}: {list?: boolean}) {
  const skeletonClassname = `skeleton shadow-sm  ${list ? 'w-full h-[192px] flex flex-col flex-wrap sm:flex-row p-8' : 'w-[160px] h-[170px] sm:h-[250px] sm:w-[250px] md:w-[220px] lg:w-[300px] xl:w-[356px]'}`

  return ( 
    <div className={`grid mt-12 ${list ? 'grid-cols-1 gap-y-8 justify-items-between' : 'grid-cols-2 md:grid-cols-3 gap-x-[10px] gap-y-[20px] justify-items-center'}`}>
      <div className={skeletonClassname}></div>
      <div className={skeletonClassname}></div>
      {list || <div className={skeletonClassname}></div>}
    </div>
  );
}

export default SkeletonGrid;