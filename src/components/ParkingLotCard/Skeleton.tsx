const ParkingLotCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col border rounded-md max-w-xs shrink-0 w-full">
      <div className="flex-none animate-pulse w-full relative">
        <div className=" bg-slate-200 h-32 w-full"></div>
      </div>
      <div className="animate-pulse flex-auto px-6 pt-4 pb-3">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-200 rounded"></div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingLotCardSkeleton;
