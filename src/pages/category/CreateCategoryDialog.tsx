import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { CreateCategoryForm } from "./CreateCategoryForm";

// import { EditContactForm } from "@/components/custom-form/edit-contact-form";

interface CreateCategoryDialogProps {
 open: boolean;
 onClose: () => void;
}

export default function CreateCategoryDialog({
 open,
 onClose,
}: CreateCategoryDialogProps) {
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
     <CreateCategoryForm onClose={onClose} />
     {/* <EditContactForm contact={contact} onClose={onClose} page={page} /> */}
    </DialogHeader>
   </DialogContent>
  </Dialog>
 );
}
