import { Skeleton } from "@/components/ui/skeleton";

const NoteDetailSkeleton = () => {
  return (
    <div className="max-w-[1024px] mx-auto mt-8 text-start px-4">
      <Skeleton className="h-8 w-1/2 mb-2" />
      <Skeleton className="h-5 w-1/4 mb-4" />
      <Skeleton className="h-32 w-full mb-4" />
      <div className="flex gap-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};

export default NoteDetailSkeleton;
