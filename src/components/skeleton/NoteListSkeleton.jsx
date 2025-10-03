import { Skeleton } from "@/components/ui/skeleton";
import PropTypes from "prop-types";

const NoteListSkeleton = ({ count }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <Skeleton className="h-32 rounded-lg" />
        </div>
      ))}
    </div>
  );
};

NoteListSkeleton.propTypes = {
  count: PropTypes.number.isRequired,
};

export default NoteListSkeleton;
