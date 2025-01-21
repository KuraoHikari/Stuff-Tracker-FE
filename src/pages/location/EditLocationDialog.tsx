import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";

import { Location } from "./data/schema";
import { EditLocationForm } from "./EditLocationForm";

interface EditLocationDialogProps {
 location: Location;
 open: boolean;
 onClose: () => void;
}

export default function EditLocationDialog({
 location,
 open,
 onClose,
}: EditLocationDialogProps) {
 function handleOpenChange(open: boolean) {
  if (!open) {
   onClose();
  }
 }

 return (
  <Dialog open={open} onOpenChange={handleOpenChange}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Edit Location</DialogTitle>
     <DialogDescription>
      Fill in the details below to Edit a Location. Make sure to provide a
      unique name and a brief description.
     </DialogDescription>
     <EditLocationForm onClose={onClose} location={location} />
    </DialogHeader>
   </DialogContent>
  </Dialog>
 );
}
