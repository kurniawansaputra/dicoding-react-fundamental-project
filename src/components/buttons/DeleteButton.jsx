import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import ConfirmationDialog from "../alert-dialog/ConfirmationDialog";

const DeleteButton = ({ onDelete, loading }) => {
  const [open, setOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDelete();
    setOpen(false);
  };

  const handleCancelDelete = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="destructive"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <ArrowPathIcon className="w-6 h-6 animate-spin" />
        ) : (
          <TrashIcon className="w-6 h-6" />
        )}
        {loading ? "Loading..." : "Delete"}
      </Button>

      <ConfirmationDialog
        isOpen={open}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete"
        description="Are you sure you want to delete this note? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DeleteButton;
