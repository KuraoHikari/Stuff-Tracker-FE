import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";

import { Status } from "./data/schema";
import { EditStatusForm } from "./EditStatusForm";

interface EditStatusDialogProps {
 status: Status;
 open: boolean;
 onClose: () => void;
}

export default function EditStatusDialog({
 status,
 open,
 onClose,
}: EditStatusDialogProps) {
 function handleOpenChange(open: boolean) {
  if (!open) {
   onClose();
  }
 }

 return (
  <Dialog open={open} onOpenChange={handleOpenChange}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Edit Status</DialogTitle>
     <DialogDescription>
      Fill in the details below to Edit a Status. Make sure to provide a unique
      name and a brief description.
     </DialogDescription>
     <EditStatusForm onClose={onClose} status={status} />
    </DialogHeader>
   </DialogContent>
  </Dialog>
 );
}
