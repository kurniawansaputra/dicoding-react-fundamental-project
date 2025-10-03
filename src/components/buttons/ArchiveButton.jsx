import { Button } from "@/components/ui/button";
import {
  ArchiveBoxArrowDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const ArchiveButton = ({ onArchive, loading }) => {
  return (
    <Button
      variant="outline"
      onClick={onArchive}
      className="flex items-center gap-2"
      disabled={loading}
    >
      {loading ? (
        <ArrowPathIcon className="w-6 h-6 animate-spin" />
      ) : (
        <ArchiveBoxArrowDownIcon className="w-6 h-6" />
      )}
      {loading ? "Loading..." : "Archive"}
    </Button>
  );
};

ArchiveButton.propTypes = {
  onArchive: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ArchiveButton;
