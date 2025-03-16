function SkeletonGrid({list=false}: {list?: boolean}) {
  return ( 
    <div className={`grid mt-12 ${list ? 'grid-cols-1 gap-y-8' : 'grid-cols-3 gap-[6px]'}`}>
      <div className="skeleton w-[356px] shadow-sm h-[208px]"></div>
      <div className="skeleton w-[356px] shadow-sm h-[208px]"></div>
      <div className="skeleton w-[356px] shadow-sm h-[208px]"></div>
    </div>
  );
}

export default SkeletonGrid;