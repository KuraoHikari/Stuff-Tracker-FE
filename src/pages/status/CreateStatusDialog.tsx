import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { CreateStatusForm } from "./CreateStatusForm";

// import { EditContactForm } from "@/components/custom-form/edit-contact-form";

interface CreateStatusDialogProps {
 open: boolean;
 onClose: () => void;
}

export default function CreateStatusDialog({
 open,
 onClose,
}: CreateStatusDialogProps) {
 function handleOpenChange(open: boolean) {
  if (!open) {
   onClose();
  }
 }

 return (
  <Dialog open={open} onOpenChange={handleOpenChange}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Create Category</DialogTitle>
     <DialogDescription>
      Fill in the details below to create a new category. Make sure to provide a
      unique name and a brief description.
     </DialogDescription>
     <CreateStatusForm onClose={onClose} />
     {/* <EditContactForm contact={contact} onClose={onClose} page={page} /> */}
    </DialogHeader>
   </DialogContent>
  </Dialog>
 );
}
