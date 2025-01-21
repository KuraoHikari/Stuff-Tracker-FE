import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";

import { Condition } from "./data/schema";
import { EditConditionForm } from "./EditConditionForm";

interface EditConditionDialogProps {
 condition: Condition;
 open: boolean;
 onClose: () => void;
}

export default function EditConditionDialog({
 condition,
 open,
 onClose,
}: EditConditionDialogProps) {
 function handleOpenChange(open: boolean) {
  if (!open) {
   onClose();
  }
 }

 return (
  <Dialog open={open} onOpenChange={handleOpenChange}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Edit Condition</DialogTitle>
     <DialogDescription>
      Fill in the details below to Edit a Condition. Make sure to provide a
      unique name and a brief description.
     </DialogDescription>
     <EditConditionForm onClose={onClose} condition={condition} />
    </DialogHeader>
   </DialogContent>
  </Dialog>
 );
}
