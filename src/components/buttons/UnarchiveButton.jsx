import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import {
  ArchiveBoxXMarkIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const UnarchiveButton = ({ onUnarchive, loading }) => {
  return (
    <Button
      variant="secondary"
      onClick={onUnarchive}
      className="flex items-center gap-2"
      disabled={loading}
    >
      {loading ? (
        <ArrowPathIcon className="w-6 h-6 animate-spin" />
      ) : (
        <ArchiveBoxXMarkIcon className="w-6 h-6" />
      )}
      {loading ? "Loading..." : "Unarchive"}
    </Button>
  );
};

UnarchiveButton.propTypes = {
  onUnarchive: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default UnarchiveButton;
