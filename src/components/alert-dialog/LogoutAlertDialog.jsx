import PropTypes from "prop-types";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PowerIcon } from "@heroicons/react/24/outline";

const LogoutWithConfirmation = ({ onLogout }) => {
  const [open, setOpen] = useState(false);

  const handleConfirmLogout = () => {
    onLogout();
    setOpen(false);
  };

  const handleCancelLogout = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <PowerIcon className="h-6 w-6" />
      </div>

      <AlertDialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? You will need to login again to
              access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={handleCancelLogout}>
              Cancel
            </Button>
            <Button onClick={handleConfirmLogout}>Logout</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

LogoutWithConfirmation.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default LogoutWithConfirmation;
